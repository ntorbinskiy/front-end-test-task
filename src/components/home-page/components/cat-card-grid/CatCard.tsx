import React, { JSX } from 'react';

import { CatBreed } from '../../../../services/cats-service.ts';
import { ATTRIBUTE_COLOR_MAP, ProgressBar } from '../ProgressBar.tsx';

export interface CatCardProps {
    cat: CatBreed;
}

export const CatCard: React.FC<CatCardProps> = ({ cat }): JSX.Element => {
  return (
    <div
      className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow"
    >
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

        <div className="mt-4 space-y-3">
          <ProgressBar
            label="Adaptability"
            value={cat.adaptability}
            maxValue={5}
            colorClass={ATTRIBUTE_COLOR_MAP.adaptability}
          />

          <ProgressBar
            label="Affection Level"
            value={cat.affection_level}
            maxValue={5}
            colorClass={ATTRIBUTE_COLOR_MAP.affection_level}
          />

          <ProgressBar
            label="Intelligence"
            value={cat.intelligence}
            maxValue={5}
            colorClass={ATTRIBUTE_COLOR_MAP.intelligence}
          />

          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Life Span:</span>
            <span className="text-sm font-medium text-gray-700">{cat.life_span} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};