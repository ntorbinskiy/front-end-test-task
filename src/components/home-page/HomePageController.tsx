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

// Define chart color palette
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
    error: FetchBaseQueryError | SerializedError | undefined;
    processedCats: CatBreed[];
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

  // RTK Query hook for fetching data
  const { data: cats = [], isLoading, error } = useGetCatBreedsQuery();

  // State for sorting and filtering
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Combined filters state for processing
  const filters = useMemo(() => ({
    sortBy,
    sortDirection,
    filterBy,
    searchTerm,
  }), [sortBy, sortDirection, filterBy, searchTerm]);

  // Process the data based on sort, filter, and search options
  const processedCats = useMemo(() =>
    processData(cats, filters),
  [cats, filters]);

  // Prepare chart data
  const chartData = useMemo(() =>
    prepareChartsData(cats),
  [cats]);

  // Effect to check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Handle filter changes
  const handleFilterChange = (option: FilterOption): void => {
    setFilterBy(option);
  };

  // Handle sort changes
  const handleSortChange = (option: SortOption): void => {
    setSortBy(option);
  };

  // Toggle sort direction
  const handleSortDirectionToggle = (): void => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Handle search changes
  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  const viewProps: HomePageViewProps = {
    isLoading,
    error,
    processedCats,
    chartData,
    colors: COLORS,
    filters,
    handlers: {
      handleSortChange,
      handleSortDirectionToggle,
      handleFilterChange,
      handleSearchChange,
    },
  };

  return <HomePageView {...viewProps} />;
};