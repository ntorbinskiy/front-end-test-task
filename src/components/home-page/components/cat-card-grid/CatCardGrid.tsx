import React, { JSX } from 'react';

import { CatCard } from './CatCard';
import { CatBreed } from '../../../../services/cats-service.ts';

export interface CatCardGridProps {
    cats: CatBreed[];
}

export const CatCardGrid: React.FC<CatCardGridProps> = ({ cats }): JSX.Element => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Cat Breeds ({cats.length})</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
};