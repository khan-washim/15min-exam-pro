import React from 'react';
import { Bar } from 'react-chartjs';

const SubjectChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.subject),
    datasets: [
      {
        label: 'Score',
        data: data.map(d => d.score),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 10)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 10)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <div style={{ height: '300px', width: '100%' }}>
    <Bar data={chartData} options={{ maintainAspectRatio: false }} />
  </div>
};

export default SubjectChart;