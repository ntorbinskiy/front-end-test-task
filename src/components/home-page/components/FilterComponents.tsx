import React, { JSX, useEffect, useId, useRef } from 'react';
import { FilterOption, SortDirection, SortOption } from '../home-model.ts';

interface PrelineSelectProps {
    id: string;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    placeholder?: string;
    darkMode?: boolean;
}

export const PrelineSelect: React.FC<PrelineSelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  darkMode = false,
}): JSX.Element => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const uniqueId = useId();
  const selectId = `${id}-${uniqueId}`;

  useEffect(() => {
    if (selectRef.current) {

      window.HSStaticMethods.autoInit();
    }
  }, []);

  useEffect(() => {
    const handleSelectChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.value !== undefined && customEvent.detail?.id === selectId) {
        onChange(customEvent.detail.value);
      }
    };

    document.addEventListener('change.hs.select', handleSelectChange);

    return () => {
      document.removeEventListener('change.hs.select', handleSelectChange);
    };
  }, [onChange, selectId]);

  const containerClasses = darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-800';
  const dropdownClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const optionClasses = darkMode ? 'text-gray-200 hover:bg-gray-700 focus:bg-gray-700' : 'text-gray-800 hover:bg-gray-100 focus:bg-gray-100';

  return (
    <div>
      <label htmlFor={selectId} className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} ${label ? 'mb-2' : ''}`}>
        {label}
      </label>
      <select
        id={selectId}
        ref={selectRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-hs-select={`{
          "placeholder": "<span class='inline-flex items-center'>${placeholder}</span>",
          "toggleTag": "<button type='button' aria-expanded='false'></button>",
          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2.5 px-4 flex gap-x-2 text-nowrap w-full cursor-pointer ${containerClasses} border rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 ${dropdownClasses} border rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
          "optionClasses": "py-2 px-4 w-full text-sm ${optionClasses} cursor-pointer rounded-lg focus:outline-none",
          "optionTemplate": "<div class='flex justify-between items-center w-full'><span data-title></span><span class='hidden hs-selected:block'><svg class='shrink-0 size-3.5 text-blue-600' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></span></div>",
          "extraMarkup": "<div class='absolute top-1/2 end-3 -translate-y-1/2'><svg class='shrink-0 size-3.5 text-gray-500' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 15 5 5 5-5'/><path d='m7 9 5-5 5 5'/></svg></div>"
        }`}
        className="hidden"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export interface FilterComponentProps {
    filterBy: FilterOption;
    onFilterChange: (option: FilterOption) => void;
    darkMode?: boolean;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  filterBy,
  onFilterChange,
  darkMode = false,
}): JSX.Element => {
  const filterOptions = [
    { value: 'all', label: 'All Cats' },
    { value: 'indoor', label: 'Indoor Cats' },
    { value: 'lap', label: 'Lap Cats' },
    { value: 'hypoallergenic', label: 'Hypoallergenic' },
    { value: 'natural', label: 'Natural Breeds' },
    { value: 'rare', label: 'Rare Breeds' },
  ];

  return (
    <PrelineSelect
      id="filter-select"
      label="Filter By"
      value={filterBy}
      options={filterOptions}
      onChange={(value) => onFilterChange(value as FilterOption)}
      placeholder="Filter"
      darkMode={darkMode}
    />
  );
};

export interface SortComponentProps {
    sortBy: SortOption;
    sortDirection: SortDirection;
    onSortChange: (option: SortOption) => void;
    onSortDirectionToggle: () => void;
    darkMode?: boolean;
}

export interface SortComponentProps {
    sortBy: SortOption;
    sortDirection: SortDirection;
    onSortChange: (option: SortOption) => void;
    onSortDirectionToggle: () => void;
    darkMode?: boolean;
}

export const SortComponent: React.FC<SortComponentProps> = ({
  sortBy,
  sortDirection,
  onSortChange,
  onSortDirectionToggle,
  darkMode = false,
}): JSX.Element => {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'origin', label: 'Origin' },
    { value: 'adaptability', label: 'Adaptability' },
    { value: 'affection_level', label: 'Affection Level' },
    { value: 'intelligence', label: 'Intelligence' },
  ];

  return (
    <div>
      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                Sort By
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <PrelineSelect
            id="sort-select"
            label=""
            value={sortBy}
            options={sortOptions}
            onChange={(value) => onSortChange(value as SortOption)}
            placeholder="Sort By"
            darkMode={darkMode}
          />
        </div>
        <button
          type="button"
          className={`cursor-pointer min-w-10 h-[42px] py-2.5 px-3 inline-flex justify-center items-center text-sm font-medium rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
              : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'
          }`}
          onClick={onSortDirectionToggle}
          aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
        >
          {sortDirection === 'asc' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export interface SearchComponentProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    darkMode?: boolean;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  onSearchChange,
  darkMode = false,
}): JSX.Element => {
  return (
    <div>
      <label htmlFor="search" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          className={`py-2.5 px-4 ps-10 block w-full border rounded-lg text-sm focus:ring-blue-500 ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-gray-200 focus:border-blue-700'
              : 'bg-white border-gray-200 text-gray-800 focus:border-blue-500'
          }`}
          placeholder="Search cat breeds..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
          <svg className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export interface FilterBarProps {
    searchTerm: string;
    filterBy: FilterOption;
    sortBy: SortOption;
    sortDirection: SortDirection;
    onSearchChange: (value: string) => void;
    onFilterChange: (option: FilterOption) => void;
    onSortChange: (option: SortOption) => void;
    onSortDirectionToggle: () => void;
    darkMode?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  filterBy,
  sortBy,
  sortDirection,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onSortDirectionToggle,
  darkMode = false,
}): JSX.Element => {
  return (
    <div className={`p-5 rounded-xl shadow-sm ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SearchComponent
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          darkMode={darkMode}
        />
        <FilterComponent
          filterBy={filterBy}
          onFilterChange={onFilterChange}
          darkMode={darkMode}
        />
        <SortComponent
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
          onSortDirectionToggle={onSortDirectionToggle}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};