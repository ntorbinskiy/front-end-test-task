import React, {  useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/store';
import { useGetCatBreedsQuery } from '../../services/cats-service';
import {
  ChartDataItem,
  LifeSpanDataItem,
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
    chartData: {
        adaptabilityData: ChartDataItem[];
        affectionData: ChartDataItem[];
        originData: ChartDataItem[];
        indoorData: ChartDataItem[];
        lapData: ChartDataItem[];
        lifeSpanData: LifeSpanDataItem[];
    };
    colors: typeof COLORS;
}

export const HomePageController: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // RTK Query hook for fetching data
  const { data: cats = [], isLoading, error } = useGetCatBreedsQuery();

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

  const viewProps: HomePageViewProps = {
    isLoading,
    error,
    processedCats: [],
    chartData,
    colors: COLORS,
  };

  return <HomePageView {...viewProps} />;
};