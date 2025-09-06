import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface SkillsRadarChartProps {
  skills: string[];
  values: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ 
  skills, 
  values, 
  label,
  backgroundColor,
  borderColor 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: skills,
        datasets: [
          {
            label: label,
            data: values,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 2,
            pointBackgroundColor: borderColor,
            pointRadius: 4,
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)',
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              backdropColor: 'transparent',
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [skills, values, label, backgroundColor, borderColor]);

  return (
    <div className="h-64 md:h-72 w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SkillsRadarChart;