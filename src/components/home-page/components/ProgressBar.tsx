import React from 'react';

interface ProgressBarProps {
    value: number;
    maxValue: number;
    label?: string;
    showText?: boolean;
    colorClass?: string;
}

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