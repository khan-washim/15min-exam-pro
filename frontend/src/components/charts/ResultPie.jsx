import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// 1. Register the elements needed for a Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPie = ({ correct = 0, wrong = 0, skipped = 0 }) => {
  // 2. Prepare the data object
  const data = {
    labels: ['Correct', 'Wrong', 'Skipped'],
    datasets: [
      {
        data: [correct, wrong, skipped],
        backgroundColor: [
          '#10b981', // Green for Correct
          '#ef4444', // Red for Wrong
          '#94a3b8'  // Gray for Skipped
        ],
        hoverOffset: 10,
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // 3. Define options for better styling
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%', // Controls the thickness of the "donut" hole
  };

  return (
    <div style={{ height: '300px', width: '300px', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ResultPie;