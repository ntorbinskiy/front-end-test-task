import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../store/store';
import { useGetCatBreedsQuery } from '../services/cats-service';
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
import type { CatBreed } from '../services/cats-service';

// Define chart color palette
const COLORS: string[] = [
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

// Sort and filter options type definitions
type SortOption = 'name' | 'origin' | 'adaptability' | 'affection_level' | 'intelligence';
type FilterOption = 'all' | 'indoor' | 'lap' | 'hypoallergenic' | 'natural' | 'rare';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // RTK Query hook for fetching data
  const { data: cats = [], isLoading, error } = useGetCatBreedsQuery();

  // State for sorting and filtering
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Process the data based on sort, filter, and search options
  const processedCats = useMemo(() => {
    if (!cats.length) return [];

    // Filter cats
    let filteredCats = [...cats];

    if (searchTerm) {
      filteredCats = filteredCats.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterBy === 'indoor') {
      filteredCats = filteredCats.filter((cat) => cat.indoor === 1);
    } else if (filterBy === 'lap') {
      filteredCats = filteredCats.filter((cat) => cat.lap === 1);
    } else if (filterBy === 'hypoallergenic') {
      filteredCats = filteredCats.filter((cat) => cat.hypoallergenic === 1);
    } else if (filterBy === 'natural') {
      filteredCats = filteredCats.filter((cat) => cat.natural === 1);
    } else if (filterBy === 'rare') {
      filteredCats = filteredCats.filter((cat) => cat.rare === 1);
    }

    // Create a new array for sorting to avoid mutating the filtered array
    return [...filteredCats].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'origin') {
        comparison = a.origin.localeCompare(b.origin);
      } else {
        // For numeric properties
        comparison = (a[sortBy] || 0) - (b[sortBy] || 0);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  }, [cats, sortBy, sortDirection, filterBy, searchTerm]);

  // Charts data
  const [adaptabilityData, setAdaptabilityData] = useState<any[]>([]);
  const [affectionData, setAffectionData] = useState<any[]>([]);
  const [originData, setOriginData] = useState<any[]>([]);
  const [indoorData, setIndoorData] = useState<any[]>([]);
  const [lapData, setLapData] = useState<any[]>([]);
  const [lifeSpanData, setLifeSpanData] = useState<any[]>([]);

  // Effect to check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Effect to update chart data
  useEffect(() => {
    if (!cats.length) return;

    // Prepare data for Adaptability chart (top 10 breeds)
    setAdaptabilityData(
      [...cats] // Create a new array with spread operator to avoid mutating the original
        .sort((a, b) => b.adaptability - a.adaptability)
        .slice(0, 10)
        .map((cat) => ({
          name: cat.name,
          value: cat.adaptability,
        })),
    );

    // Prepare data for Affection chart (top 10 breeds)
    setAffectionData(
      [...cats] // Create a new array with spread operator to avoid mutating the original
        .sort((a, b) => b.affection_level - a.affection_level)
        .slice(0, 10)
        .map((cat) => ({
          name: cat.name,
          value: cat.affection_level,
        })),
    );

    // Prepare data for Origins pie chart
    const origins = cats.reduce((acc: Record<string, number>, cat) => {
      const origin = cat.origin || 'Unknown';
      acc[origin] = (acc[origin] || 0) + 1;
      return acc;
    }, {});

    setOriginData(
      Object.entries(origins)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8), // Top 8 origins
    );

    // Prepare data for Indoor vs Outdoor chart
    const indoorCount = cats.reduce(
      (acc: { indoor: number; outdoor: number }, cat) => {
        if (cat.indoor === 1) {
          acc.indoor += 1;
        } else {
          acc.outdoor += 1;
        }
        return acc;
      },
      { indoor: 0, outdoor: 0 },
    );

    setIndoorData([
      { name: 'Indoor', value: indoorCount.indoor },
      { name: 'Outdoor', value: indoorCount.outdoor },
    ]);

    // Prepare data for Lap Cat chart
    const lapCount = cats.reduce(
      (acc: { lap: number; notLap: number }, cat) => {
        if (cat.lap === 1) {
          acc.lap += 1;
        } else {
          acc.notLap += 1;
        }
        return acc;
      },
      { lap: 0, notLap: 0 },
    );

    setLapData([
      { name: 'Lap Cat', value: lapCount.lap },
      { name: 'Not Lap Cat', value: lapCount.notLap },
    ]);

    // Prepare data for Life Span chart (top 10 longest living breeds)
    setLifeSpanData(
      cats
        .filter((cat) => cat.life_span)
        .map((cat) => {
          // Extract max lifespan from ranges like "12 - 15"
          const lifeSpanParts = cat.life_span.split('-');
          const maxLifeSpan = lifeSpanParts.length > 1
            ? parseInt(lifeSpanParts[1].trim(), 10)
            : parseInt(lifeSpanParts[0].trim(), 10);

          return {
            name: cat.name,
            years: maxLifeSpan,
          };
        })
        .sort((a, b) => b.years - a.years)
        .slice(0, 10),
    );
  }, [cats]);

  // Show loading or error states
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

  // Toggle sort direction
  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Adaptability Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
              Adaptability Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={adaptabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Affection Levels */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Affection Levels</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={affectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00C49F" />
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
                  data={originData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {originData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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
                  data={indoorData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {indoorData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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
                  data={lapData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {lapData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Life Span Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Life Span Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={lifeSpanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="years" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls - Moved to bottom */}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter By
            </label>
            <select
              id="filter"
              className="py-2 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            >
              <option value="all">All Cats</option>
              <option value="indoor">Indoor Cats</option>
              <option value="lap">Lap Cats</option>
              <option value="hypoallergenic">Hypoallergenic</option>
              <option value="natural">Natural Breeds</option>
              <option value="rare">Rare Breeds</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
            </label>
            <div className="flex">
              <select
                id="sort"
                className="py-2 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
              >
                <option value="name">Name</option>
                <option value="origin">Origin</option>
                <option value="adaptability">Adaptability</option>
                <option value="affection_level">Affection Level</option>
                <option value="intelligence">Intelligence</option>
              </select>
              <button
                className="ml-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              >
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cats Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Cat Breeds ({processedCats.length})</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedCats.map((cat: CatBreed) => (
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

export default HomePage;