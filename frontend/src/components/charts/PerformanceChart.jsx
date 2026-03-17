import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 1. Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ data = [] }) => {
  // 2. Prepare the data
  const chartData = {
    labels: data.map(d => d.subject),
    datasets: [
      {
        label: 'Net Score',
        data: data.map(d => d.score),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 5, // Optional: makes bars look modern
      },
    ],
  };

  // 3. Define the options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subject-wise Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
            stepSize: 20
        }
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PerformanceChart;