import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./AppointmentChart.module.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const AppointmentChart = ({ status }) => {
  const stats = {
    totalAppointments: status.totalAppointments,
    pending: status.pending,
    confirmed: status.confirmed,
    canceled: status.canceled,
  };

  const chartRef = useRef(null);

  const total = stats.totalAppointments;
  const pendingPercent = ((stats.pending / total) * 100).toFixed(1);
  const confirmedPercent = ((stats.confirmed / total) * 100).toFixed(1);
  const canceledPercent = ((stats.canceled / total) * 100).toFixed(1);

  const chartData = {
    labels: ["Pending", "Confirmed", "Canceled"],
    datasets: [
      {
        data: [stats.pending, stats.confirmed, stats.canceled],
        backgroundColor: [
          "rgba(255, 209, 102, 0.9)",
          "rgba(6, 214, 160, 0.9)",
          "rgba(239, 71, 111, 0.9)",
        ],
        borderColor: [
          "rgba(255, 209, 102, 1)",
          "rgba(6, 214, 160, 1)",
          "rgba(239, 71, 111, 1)",
        ],
        borderWidth: 3,
        borderJoinStyle: "round",
        spacing: 6,
        borderRadius: 12,
        hoverOffset: 15,
        hoverBorderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} appointments (${percentage}%)`;
          },
        },
        animation: {
          duration: 300,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
      animateRotate: true,
      animateScale: true,
    },
    hover: {
      animationDuration: 300,
    },
    elements: {
      arc: {
        borderWidth: 3,
        borderJoinStyle: "round",
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.glassCard}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.glassCard} ${styles.fadeIn}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Appointment Overview</h1>
          <p className={styles.subtitle}>Real-time status distribution</p>
        </div>

        <div className={styles.chartContainer}>
          <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        <div className={styles.statsGrid}>
          <div
            className={`${styles.statCard} ${styles.total} ${styles.slideUp}`}
          >
            <span className={styles.statNumber}>{stats.totalAppointments}</span>
            <div className={styles.statLabel}>Total Appointments</div>
          </div>

          <div
            className={`${styles.statCard} ${styles.pending} ${styles.slideUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className={styles.statNumber}>{stats.pending}</span>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.percentage}>{pendingPercent}%</div>
          </div>

          <div
            className={`${styles.statCard} ${styles.confirmed} ${styles.slideUp}`}
            style={{ animationDelay: "0.2s" }}
          >
            <span className={styles.statNumber}>{stats.confirmed}</span>
            <div className={styles.statLabel}>Confirmed</div>
            <div className={styles.percentage}>{confirmedPercent}%</div>
          </div>

          <div
            className={`${styles.statCard} ${styles.canceled} ${styles.slideUp}`}
            style={{ animationDelay: "0.3s" }}
          >
            <span className={styles.statNumber}>{stats.canceled}</span>
            <div className={styles.statLabel}>Canceled</div>
            <div className={styles.percentage}>{canceledPercent}%</div>
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.pending}`}></div>
            <span className={styles.legendText}>Pending</span>
            <span className={styles.legendPercentage}>({pendingPercent}%)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.confirmed}`}></div>
            <span className={styles.legendText}>Confirmed</span>
            <span className={styles.legendPercentage}>
              ({confirmedPercent}%)
            </span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.canceled}`}></div>
            <span className={styles.legendText}>Canceled</span>
            <span className={styles.legendPercentage}>
              ({canceledPercent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentChart;
