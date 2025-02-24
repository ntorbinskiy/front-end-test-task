import React, { JSX } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartDataItem } from '../../home-model.ts';
import { RechartsContainer } from './RechartsContainer.tsx';

export interface BarChartComponentProps {
    data: ChartDataItem[];
    title: string;
    fill: string;
    dataKey?: string;
    nameKey?: string;
    tooltipFormatter?: (value: number, name: string) => [string, string];
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  title,
  fill,
  dataKey = 'value',
  nameKey = 'name',
  tooltipFormatter,
}): JSX.Element => {
  return (
    <RechartsContainer title={title}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip
          formatter={tooltipFormatter}
        />
        <Bar dataKey={dataKey} fill={fill} />
      </BarChart>
    </RechartsContainer>
  );
};