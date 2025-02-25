import React from 'react';
import { HomePageViewProps } from './HomePageController';
import { CatCardGrid } from './components/cat-card-grid/CatCardGrid';
import { BarChartComponent } from './components/charts/BarChartComponent';
import { PieChartComponent } from './components/charts/PieChartComponent';
import { LineChartComponent } from './components/charts/LineChartComponent';
import { FilterBar } from './components/FilterComponents';
import { Pagination } from './components/Pagination';

export const HomePageView: React.FC<HomePageViewProps> = ({
  isLoading,
  error,
  currentCats,
  chartData,
  colors,
  filters,
  pagination,
  handlers,
}) => {

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <BarChartComponent
          title="Adaptability Distribution"
          data={chartData.adaptabilityData}
          fill={colors[0]}
        />

        <BarChartComponent
          title="Affection Levels"
          data={chartData.affectionData}
          fill={colors[1]}
        />

        <PieChartComponent
          title="Top Origins"
          data={chartData.originData}
          colors={colors}
        />

        <PieChartComponent
          title="Indoor vs Outdoor Preference"
          data={chartData.indoorData}
          colors={colors}
        />

        <PieChartComponent
          title="Lap Cat Distribution"
          data={chartData.lapData}
          colors={colors}
        />

        <LineChartComponent
          title="Life Span Distribution"
          data={chartData.lifeSpanData}
          stroke={colors[4]}
        />
      </div>

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
          darkMode={false}
        />
      </div>

      <div id="cat-grid" className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Cat Breeds ({pagination.totalItems})</h2>
          {pagination.totalItems > 0 && (
            <div className="text-sm text-gray-500">
                  Showing {Math.min(pagination.currentPage * 9, pagination.totalItems) - Math.min((pagination.currentPage - 1) * 9, pagination.totalItems)} of {pagination.totalItems} breeds
            </div>
          )}
        </div>

        <CatCardGrid cats={currentCats} />

        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.handlePageChange}
            darkMode={false}
          />
        )}
      </div>
    </div>
  );
};
