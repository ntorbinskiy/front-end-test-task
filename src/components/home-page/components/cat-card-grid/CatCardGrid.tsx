import React, { JSX } from 'react';

import { CatCard } from './CatCard';
import { CatBreed } from '../../../../services/cats-service';

export interface CatCardGridProps {
    cats: CatBreed[];
}

export const CatCardGrid: React.FC<CatCardGridProps> = ({ cats }): JSX.Element => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}

      {cats.length === 0 && (
        <div className="col-span-3 text-center py-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No cats found matching your criteria. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};
