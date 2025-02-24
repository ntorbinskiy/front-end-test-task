
import { CatBreed } from '../../services/cats-service.ts';

export type SortOption = 'name' | 'origin' | 'adaptability' | 'affection_level' | 'intelligence';
export type FilterOption = 'all' | 'indoor' | 'lap' | 'hypoallergenic' | 'natural' | 'rare';
export type SortDirection = 'asc' | 'desc';

export interface ChartDataItem {
    name: string;
    value: number;
}

export interface LifeSpanDataItem {
    name: string;
    years: number;
}

export interface HomeFilters {
    sortBy: SortOption;
    sortDirection: SortDirection;
    filterBy: FilterOption;
    searchTerm: string;
}

export interface ChartsData {
    adaptabilityData: ChartDataItem[];
    affectionData: ChartDataItem[];
    originData: ChartDataItem[];
    indoorData: ChartDataItem[];
    lapData: ChartDataItem[];
    lifeSpanData: LifeSpanDataItem[];
}

export const processData = (
  cats: CatBreed[],
  filters: HomeFilters,
): CatBreed[] => {
  if (!cats.length) return [];

  // Filter cats
  let filteredCats = [...cats];

  if (filters.searchTerm) {
    filteredCats = filteredCats.filter((cat) =>
      cat.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            cat.origin?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(filters.searchTerm.toLowerCase()),
    );
  }

  if (filters.filterBy === 'indoor') {
    filteredCats = filteredCats.filter((cat) => cat.indoor === 1);
  } else if (filters.filterBy === 'lap') {
    filteredCats = filteredCats.filter((cat) => cat.lap === 1);
  } else if (filters.filterBy === 'hypoallergenic') {
    filteredCats = filteredCats.filter((cat) => cat.hypoallergenic === 1);
  } else if (filters.filterBy === 'natural') {
    filteredCats = filteredCats.filter((cat) => cat.natural === 1);
  } else if (filters.filterBy === 'rare') {
    filteredCats = filteredCats.filter((cat) => cat.rare === 1);
  }

  // Create a new array for sorting to avoid mutating the filtered array
  return [...filteredCats].sort((a, b) => {
    let comparison = 0;

    if (filters.sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (filters.sortBy === 'origin') {
      comparison = (a.origin || '').localeCompare(b.origin || '');
    } else {
      // For numeric properties
      comparison = (a[filters.sortBy] || 0) - (b[filters.sortBy] || 0);
    }

    return filters.sortDirection === 'asc' ? comparison : -comparison;
  });
};

/**
 * Prepare chart data from cat breeds
 */
export const prepareChartsData = (cats: CatBreed[]): ChartsData => {
  if (!cats.length) {
    return {
      adaptabilityData: [],
      affectionData: [],
      originData: [],
      indoorData: [],
      lapData: [],
      lifeSpanData: [],
    };
  }

  // Prepare data for Adaptability chart (top 10 breeds)
  const adaptabilityData = [...cats]
    .sort((a, b) => b.adaptability - a.adaptability)
    .slice(0, 10)
    .map((cat) => ({
      name: cat.name,
      value: cat.adaptability,
    }));

  // Prepare data for Affection chart (top 10 breeds)
  const affectionData = [...cats]
    .sort((a, b) => b.affection_level - a.affection_level)
    .slice(0, 10)
    .map((cat) => ({
      name: cat.name,
      value: cat.affection_level,
    }));

  // Prepare data for Origins pie chart
  const origins = cats.reduce((acc: Record<string, number>, cat) => {
    const origin = cat.origin || 'Unknown';
    acc[origin] = (acc[origin] || 0) + 1;
    return acc;
  }, {});

  const originData = Object.entries(origins)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Top 8 origins

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

  const indoorData = [
    { name: 'Indoor', value: indoorCount.indoor },
    { name: 'Outdoor', value: indoorCount.outdoor },
  ];

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

  const lapData = [
    { name: 'Lap Cat', value: lapCount.lap },
    { name: 'Not Lap Cat', value: lapCount.notLap },
  ];

  // Prepare data for Life Span chart (top 10 longest living breeds)
  const lifeSpanData = cats
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
    .slice(0, 10);

  return {
    adaptabilityData,
    affectionData,
    originData,
    indoorData,
    lapData,
    lifeSpanData,
  };
};