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

  const getSortComparator = (sortBy: SortOption, direction: SortDirection) => {
    return (a: CatBreed, b: CatBreed): number => {
      let result: number;

      switch (sortBy) {
      case 'name':
        result = a.name.localeCompare(b.name);
        break;
      case 'origin':
        result = (a.origin || '').localeCompare(b.origin || '');
        break;
      default:
        // For numeric properties
        result = (a[sortBy] || 0) - (b[sortBy] || 0);
      }

      return direction === 'asc' ? result : -result;
    };
  };

  const predicates: Array<(cat: CatBreed) => boolean> = [];

  if (filters.searchTerm) {
    const searchTermLower = filters.searchTerm.toLowerCase();
    predicates.push((cat) =>
      cat.name.toLowerCase().includes(searchTermLower) ||
            (cat.origin?.toLowerCase() || '').includes(searchTermLower) ||
            cat.description.toLowerCase().includes(searchTermLower),
    );
  }

  if (filters.filterBy !== 'all') {
    const filterMap: Record<Exclude<FilterOption, 'all'>, (cat: CatBreed) => boolean> = {
      'indoor': (cat) => cat.indoor === 1,
      'lap': (cat) => cat.lap === 1,
      'hypoallergenic': (cat) => cat.hypoallergenic === 1,
      'natural': (cat) => cat.natural === 1,
      'rare': (cat) => cat.rare === 1,
    };

    predicates.push(filterMap[filters.filterBy ]);
  }

  const filtered = predicates.length > 0
    ? cats.filter((cat) => predicates.every((predicate) => predicate(cat)))
    : [...cats];

  return filtered.sort(getSortComparator(filters.sortBy, filters.sortDirection));
};

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

  const adaptabilityData = [...cats]
    .sort((a, b) => b.adaptability - a.adaptability)
    .slice(0, 10)
    .map((cat) => ({
      name: cat.name,
      value: cat.adaptability,
    }));

  const affectionData = [...cats]
    .sort((a, b) => b.affection_level - a.affection_level)
    .slice(0, 10)
    .map((cat) => ({
      name: cat.name,
      value: cat.affection_level,
    }));

  const origins = cats.reduce((acc: Record<string, number>, cat) => {
    const origin = cat.origin || 'Unknown';
    acc[origin] = (acc[origin] || 0) + 1;
    return acc;
  }, {});

  const originData = Object.entries(origins)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

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

  const lifeSpanData = cats
    .filter((cat) => cat.life_span)
    .map((cat) => {

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