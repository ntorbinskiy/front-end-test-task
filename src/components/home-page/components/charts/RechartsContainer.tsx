import React, { JSX } from 'react';
import { ResponsiveContainer } from 'recharts';

export interface RechartsContainerProps {
    children: JSX.Element;
    title: string;
}

export const RechartsContainer: React.FC<RechartsContainerProps> = ({
  children,
  title,
}): JSX.Element => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="h-[350px]">
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};