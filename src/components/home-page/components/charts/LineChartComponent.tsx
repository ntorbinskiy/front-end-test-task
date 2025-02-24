import React, { JSX } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { RechartsContainer } from './RechartsContainer';
import { LifeSpanDataItem } from '../../home-model.ts';

export interface LineChartComponentProps {
    data: LifeSpanDataItem[];
    title: string;
    stroke: string;
    dataKey?: string;
    nameKey?: string;
    tooltipFormatter?: (value: number, name: string) => [string, string];
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  title,
  stroke,
  dataKey = 'years',
  nameKey = 'name',
  tooltipFormatter,
}): JSX.Element => {
  return (
    <RechartsContainer title={title}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip formatter={tooltipFormatter} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={stroke}
        />
      </LineChart>
    </RechartsContainer>
  );
};