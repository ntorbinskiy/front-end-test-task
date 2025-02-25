import React, { JSX } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { RechartsContainer } from './RechartsContainer';
import { ChartDataItem } from '../../home-model.ts';

export interface PieChartComponentProps {
    data: ChartDataItem[];
    title: string;
    colors: string[];
    dataKey?: string;
    nameKey?: string;
    outerRadius?: number;
    tooltipFormatter?: (value: number, name: string) => [string, string];
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  title,
  colors,
  dataKey = 'value',
  nameKey = 'name',
  outerRadius = 100,
  tooltipFormatter,
}): JSX.Element => {
  return (
    <RechartsContainer title={title}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
      </PieChart>
    </RechartsContainer>
  );
};