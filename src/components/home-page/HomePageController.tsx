import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/store';
import { useGetCatBreedsQuery } from '../../services/cats-service';
import {
  SortOption,
  FilterOption,
  SortDirection,
  HomeFilters,
  ChartDataItem,
  LifeSpanDataItem,
  processData,
  prepareChartsData,
} from './home-model';

import type { CatBreed } from '../../services/cats-service';
import { HomePageView } from './HomePageView';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Define chart color palette
// eslint-disable-next-line react-refresh/only-export-components
export const COLORS: string[] = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#8dd1e1',
  '#a4de6c',
  '#d0ed57',
];

export interface HomePageViewProps {
    isLoading: boolean;
    error:  FetchBaseQueryError | SerializedError | undefined;
    processedCats: CatBreed[];
    filters: HomeFilters;
    chartData: {
        adaptabilityData: ChartDataItem[];
        affectionData: ChartDataItem[];
        originData: ChartDataItem[];
        indoorData: ChartDataItem[];
        lapData: ChartDataItem[];
        lifeSpanData: LifeSpanDataItem[];
    };
    dropdownState: {
        isFilterDropdownOpen: boolean;
        isSortDropdownOpen: boolean;
    };
    handlers: {
        handleSortChange: (option: SortOption) => void;
        handleFilterChange: (option: FilterOption) => void;
        handleSearchChange: (value: string) => void;
        toggleFilterDropdown: () => void;
        toggleSortDropdown: () => void;
    };
    colors: typeof COLORS;
}

export const HomePageController: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // RTK Query hook for fetching data
  const { data: cats = [], isLoading, error } = useGetCatBreedsQuery();

  // State for sorting and filtering
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  // Combined filters state for processing - wrapped in useMemo to prevent unnecessary re-renders
  const filters = useMemo<HomeFilters>(() => ({
    sortBy,
    sortDirection,
    filterBy,
    searchTerm,
  }), [sortBy, sortDirection, filterBy, searchTerm]);

  // Process the data based on sort, filter, and search options
  const processedCats = useMemo(() =>
    processData(cats, filters),
  [cats, filters],
  );

  // Prepare chart data
  const chartData = useMemo(() =>
    prepareChartsData(cats),
  [cats],
  );

  // Effect to check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Toggle sort direction
  const handleSortChange = (option: SortOption): void => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
    setIsSortDropdownOpen(false);
  };

  // Handle filter change
  const handleFilterChange = (option: FilterOption): void => {
    setFilterBy(option);
    setIsFilterDropdownOpen(false);
  };

  // Handle search change
  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  // Toggle dropdown states
  const toggleFilterDropdown = (): void => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
    if (isSortDropdownOpen) setIsSortDropdownOpen(false);
  };

  const toggleSortDropdown = (): void => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    if (isFilterDropdownOpen) setIsFilterDropdownOpen(false);
  };

  const viewProps: HomePageViewProps = {
    isLoading,
    error,
    processedCats,
    filters,
    chartData,
    dropdownState: {
      isFilterDropdownOpen,
      isSortDropdownOpen,
    },
    handlers: {
      handleSortChange,
      handleFilterChange,
      handleSearchChange,
      toggleFilterDropdown,
      toggleSortDropdown,
    },
    colors: COLORS,
  };

  return <HomePageView {...viewProps} />;
};