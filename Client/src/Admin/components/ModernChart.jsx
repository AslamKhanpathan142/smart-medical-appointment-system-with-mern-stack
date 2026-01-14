import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import styles from './ModernChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ModernChart = ({showAllAppointmentData, countPatient, doctors}) => {
  const chartData = {
    totalDoctors: doctors.length,
    totalPatients: countPatient(),
    totalAppointments: showAllAppointmentData.length
  };

  const barChartData = {
    labels: ['Doctors', 'Patients', 'Appointments'],
    datasets: [
      {
        label: 'Count',
        data: [chartData.totalDoctors, chartData.totalPatients, chartData.totalAppointments],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(79, 172, 254, 0.8)'
        ],
        borderColor: [
          'rgb(102, 126, 234)',
          'rgb(240, 147, 251)',
          'rgb(79, 172, 254)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const doughnutChartData = {
    labels: ['Doctors', 'Patients', 'Appointments'],
    datasets: [
      {
        data: [chartData.totalDoctors, chartData.totalPatients, chartData.totalAppointments],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(79, 172, 254, 0.8)'
        ],
        borderColor: [
          'rgb(102, 126, 234)',
          'rgb(240, 147, 251)',
          'rgb(79, 172, 254)'
        ],
        borderWidth: 2,
        cutout: '70%',
        spacing: 5,
      }
    ]
  };
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6c757d',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6c757d',
        }
      }
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#6c757d',
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    cutout: '70%',
  };
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Healthcare Analytics</h1>
        <p className={styles.subtitle}>Real-time overview of your medical practice</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.doctors}`}>
          <div className={styles.statIcon}>👨‍⚕️</div>
          <div className={styles.statContent}>
            <h3>Total Doctors</h3>
            <div className={styles.statNumber}>{chartData.totalDoctors}</div>
            
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.patients}`}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>Total Patients</h3>
            <div className={styles.statNumber}>{chartData.totalPatients}</div>
            
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.appointments}`}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statContent}>
            <h3>Total Appointments</h3>
            <div className={styles.statNumber}>{chartData.totalAppointments}</div>
           
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Overview</h3>
          </div>
          <div className={styles.chartWrapper}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Distribution</h3>
          </div>
          <div className={styles.chartWrapper}>
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernChart;