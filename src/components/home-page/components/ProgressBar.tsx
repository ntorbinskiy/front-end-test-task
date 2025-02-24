import React from 'react';

interface ProgressBarProps {
    value: number;
    maxValue: number;
    label?: string;
    showText?: boolean;
    colorClass?: string;
}

// Define attribute types as a union to ensure type safety
export type CatAttribute =
    | 'adaptability'
    | 'affection_level'
    | 'intelligence'
    | 'energy_level'
    | 'child_friendly';

// Define color classes as a union to ensure type safety
export type ColorClass =
    | 'bg-blue-600'
    | 'bg-pink-500'
    | 'bg-purple-500'
    | 'bg-orange-500'
    | 'bg-green-500';

// Create a record mapping from attribute to color class
export const ATTRIBUTE_COLOR_MAP: Record<CatAttribute, ColorClass> = {
  adaptability: 'bg-blue-600',
  affection_level: 'bg-pink-500',
  intelligence: 'bg-purple-500',
  energy_level: 'bg-orange-500',
  child_friendly: 'bg-green-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue,
  label,
  showText = true,
  colorClass = 'bg-blue-600',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showText && (
            <span className="text-sm font-medium text-gray-700">{value}/{maxValue}</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};