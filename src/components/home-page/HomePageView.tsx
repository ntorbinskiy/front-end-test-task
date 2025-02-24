import React, { JSX } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { HomePageViewProps } from './HomePageController';
import { FilterOption, SortOption } from './home-model';

export const HomePageView: React.FC<HomePageViewProps> = ({
  isLoading,
  error,
  processedCats,
  filters,
  chartData,
  dropdownState,
  handlers,
  colors,
}) => {
  // Show loading state
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
        <div className="text-red-500">Error loading cats data: {(error as any).message || 'An unknown error occurred'}</div>
      </div>
    );
  }

  const renderFilterOptions = (): JSX.Element => {
    const options: { value: FilterOption; label: string }[] = [
      { value: 'all', label: 'All Cats' },
      { value: 'indoor', label: 'Indoor Cats' },
      { value: 'lap', label: 'Lap Cats' },
      { value: 'hypoallergenic', label: 'Hypoallergenic' },
      { value: 'natural', label: 'Natural Breeds' },
      { value: 'rare', label: 'Rare Breeds' },
    ];

    return (
      <div className="relative">
        <button
          type="button"
          className="py-2 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
          onClick={handlers.toggleFilterDropdown}
        >
          <span>{options.find((option) => option.value === filters.filterBy)?.label}</span>
          <span className="ml-2">{dropdownState.isFilterDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {dropdownState.isFilterDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  filters.filterBy === option.value ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => handlers.handleFilterChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSortOptions = (): JSX.Element => {
    const options: { value: SortOption; label: string }[] = [
      { value: 'name', label: 'Name' },
      { value: 'origin', label: 'Origin' },
      { value: 'adaptability', label: 'Adaptability' },
      { value: 'affection_level', label: 'Affection Level' },
      { value: 'intelligence', label: 'Intelligence' },
    ];

    return (
      <div className="relative">
        <div className="flex">
          <button
            type="button"
            className="py-2 px-3 flex-grow border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
            onClick={handlers.toggleSortDropdown}
          >
            <span>{options.find((option) => option.value === filters.sortBy)?.label}</span>
            <span className="ml-2">{dropdownState.isSortDropdownOpen ? '▲' : '▼'}</span>
          </button>
          <button
            className="py-2 px-3 border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onClick={() => handlers.handleSortChange(filters.sortBy)}
          >
            {filters.sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
        {dropdownState.isSortDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  filters.sortBy === option.value ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => handlers.handleSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Adaptability Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
                        Adaptability Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={chartData.adaptabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={colors[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Affection Levels */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Affection Levels</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={chartData.affectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={colors[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Origins */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Top Origins</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.originData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.originData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Indoor vs Outdoor Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
                        Indoor vs Outdoor Preference
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.indoorData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.indoorData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lap Cat Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Lap Cat Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.lapData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.lapData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Life Span Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={chartData.lifeSpanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="years" stroke={colors[4]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                            Search
            </label>
            <input
              type="text"
              id="search"
              className="py-2 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search cat breeds..."
              value={filters.searchTerm}
              onChange={(e) => handlers.handleSearchChange(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                            Filter By
            </label>
            {renderFilterOptions()}
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                            Sort By
            </label>
            {renderSortOptions()}
          </div>
        </div>
      </div>

      {/* Cats Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Cat Breeds ({processedCats.length})</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedCats.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
              <div className="p-4 md:p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {cat.name}
                </h3>
                <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                  Origin: {cat.origin || 'Unknown'}
                </span>
                <p className="mt-3 text-gray-500 line-clamp-3">
                  {cat.description || 'No description available'}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Adaptability:</span>
                    <span>{cat.adaptability}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Affection Level:</span>
                    <span>{cat.affection_level}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Life Span:</span>
                    <span>{cat.life_span} years</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};