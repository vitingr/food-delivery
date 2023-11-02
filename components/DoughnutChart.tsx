import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DoughnutProps } from '@/types/types';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({chartData, chartOptions}: DoughnutProps) => {
  return (
    <div className='max-w-[525px] h-full'>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}

export default DoughnutChart