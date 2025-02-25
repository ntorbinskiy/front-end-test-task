import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/store';
import { useGetCatBreedsQuery } from '../../services/cats-service';
import {
  SortOption,
  FilterOption,
  SortDirection,
  ChartDataItem,
  LifeSpanDataItem,
  processData,
  prepareChartsData,
} from './home-model';

import type { CatBreed } from '../../services/cats-service';
import { HomePageView } from './HomePageView';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { COLORS } from './constants.ts';

export interface HomePageViewProps {
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    processedCats: CatBreed[];
    currentCats: CatBreed[];
    chartData: {
        adaptabilityData: ChartDataItem[];
        affectionData: ChartDataItem[];
        originData: ChartDataItem[];
        indoorData: ChartDataItem[];
        lapData: ChartDataItem[];
        lifeSpanData: LifeSpanDataItem[];
    };
    colors: typeof COLORS;
    filters: {
        sortBy: SortOption;
        sortDirection: SortDirection;
        filterBy: FilterOption;
        searchTerm: string;
    };
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        handlePageChange: (page: number) => void;
    };
    handlers: {
        handleSortChange: (option: SortOption) => void;
        handleSortDirectionToggle: () => void;
        handleFilterChange: (option: FilterOption) => void;
        handleSearchChange: (value: string) => void;
    };
}

export const HomePageController: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: cats = [], isLoading, error } = useGetCatBreedsQuery();
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9);

  const filters = useMemo(() => ({
    sortBy,
    sortDirection,
    filterBy,
    searchTerm,
  }), [sortBy, sortDirection, filterBy, searchTerm]);

  const processedCats = useMemo(() =>
    processData(cats, filters),
  [cats, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(processedCats.length / itemsPerPage);

  const currentCats = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return processedCats.slice(indexOfFirstItem, indexOfLastItem);
  }, [processedCats, currentPage, itemsPerPage]);

  const chartData = useMemo(() =>
    prepareChartsData(cats),
  [cats]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById('cat-grid')?.offsetTop || 0,
      behavior: 'smooth',
    });
  };

  const handleFilterChange = (option: FilterOption): void => {
    setFilterBy(option);
  };

  const handleSortChange = (option: SortOption): void => {
    setSortBy(option);
  };

  const handleSortDirectionToggle = (): void => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  const viewProps: HomePageViewProps = {
    isLoading,
    error,
    processedCats,
    currentCats,
    chartData,
    colors: COLORS,
    filters,
    pagination: {
      currentPage,
      totalPages,
      totalItems: processedCats.length,
      handlePageChange,
    },
    handlers: {
      handleSortChange,
      handleSortDirectionToggle,
      handleFilterChange,
      handleSearchChange,
    },
  };

  return <HomePageView {...viewProps} />;
};