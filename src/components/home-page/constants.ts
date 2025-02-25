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

export type CatAttribute =
    | 'adaptability'
    | 'affection_level'
    | 'intelligence'
    | 'energy_level'
    | 'child_friendly';

export type ColorClass =
    | 'bg-blue-600'
    | 'bg-pink-500'
    | 'bg-purple-500'
    | 'bg-orange-500'
    | 'bg-green-500';

export const ATTRIBUTE_COLOR_MAP: Record<CatAttribute, ColorClass> = {
  adaptability: 'bg-blue-600',
  affection_level: 'bg-pink-500',
  intelligence: 'bg-purple-500',
  energy_level: 'bg-orange-500',
  child_friendly: 'bg-green-500',
};