import React, { JSX } from 'react';
import { HomePageViewProps } from './HomePageController';
import { CatCardGrid } from './components/cat-card-grid/CatCardGrid';
import { BarChartComponent } from './components/charts/BarChartComponent';
import { PieChartComponent } from './components/charts/PieChartComponent';
import { LineChartComponent } from './components/charts/LineChartComponent';
import { FilterBar } from './components/FilterComponents';

export const HomePageView: React.FC<HomePageViewProps> = ({
  isLoading,
  error,
  processedCats,
  chartData,
  colors,
  filters,
  handlers,
}): JSX.Element => {

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error loading cats data: 'An unknown error occurred'</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Adaptability Chart */}
        <BarChartComponent
          title="Adaptability Distribution"
          data={chartData.adaptabilityData}
          fill={colors[0]}
        />

        {/* Affection Levels */}
        <BarChartComponent
          title="Affection Levels"
          data={chartData.affectionData}
          fill={colors[1]}
        />

        {/* Top Origins */}
        <PieChartComponent
          title="Top Origins"
          data={chartData.originData}
          colors={colors}
        />

        {/* Indoor vs Outdoor Chart */}
        <PieChartComponent
          title="Indoor vs Outdoor Preference"
          data={chartData.indoorData}
          colors={colors}
        />

        {/* Lap Cat Distribution */}
        <PieChartComponent
          title="Lap Cat Distribution"
          data={chartData.lapData}
          colors={colors}
        />

        {/* Life Span Distribution */}
        <LineChartComponent
          title="Life Span Distribution"
          data={chartData.lifeSpanData}
          stroke={colors[4]}
        />
      </div>

      {/* Filter Bar */}
      <div className="my-8">
        <FilterBar
          searchTerm={filters.searchTerm}
          filterBy={filters.filterBy}
          sortBy={filters.sortBy}
          sortDirection={filters.sortDirection}
          onSearchChange={handlers.handleSearchChange}
          onFilterChange={handlers.handleFilterChange}
          onSortChange={handlers.handleSortChange}
          onSortDirectionToggle={handlers.handleSortDirectionToggle}
          darkMode={false} // Set to true for dark mode
        />
      </div>

      <CatCardGrid cats={processedCats} />
    </div>
  );
};