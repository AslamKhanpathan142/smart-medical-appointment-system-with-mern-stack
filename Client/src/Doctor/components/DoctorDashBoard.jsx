import React, { useState } from "react";
import styles from "./DoctorDashBoard.module.css";
import {
  FaCalendarCheck,
  FaUserInjured,
  FaClock,
  FaCalendarPlus,
  FaList,
  FaUser,
  FaChartLine,
  FaStethoscope,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import AppointmentChart from "./AppointmentChart";

const DoctorDashBoard = ({ doctorData, statusCounts, appointments }) => {
  const stats = {
    totalAppointments: appointments.length,
    pending: statusCounts.pending,
    confirmed: statusCounts.confirmed,
    canceled: statusCounts.cancelled,
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Doctor Dashboard</h1>
          <p>
            Welcome back, {doctorData?.userId?.name}! Here's your schedule
            overview
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search..." />
          </div>
          <div className={styles.notification}>
            <FaBell />
            <span className={styles.badge}>3</span>
          </div>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              {doctorData?.userId?.name.charAt(4)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={`${styles.statCard} ${styles.primary}`}>
          <div className={styles.statIcon}>
            <FaCalendarCheck />
          </div>
          <div className={styles.statInfo}>
            <h3>Total Appointments</h3>
            <h2>{stats.totalAppointments}</h2>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statIcon}>
            <FaUserInjured />
          </div>
          <div className={styles.statInfo}>
            <h3>Pending</h3>
            <h2>{stats.pending}</h2>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.completed}`}>
          <div className={styles.statIcon}>
            <FaCalendarCheck />
          </div>
          <div className={styles.statInfo}>
            <h3>Confirmed</h3>
            <h2>{stats.confirmed}</h2>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statIcon}>
            <FaClock />
          </div>
          <div className={styles.statInfo}>
            <h3>Canceled</h3>
            <h2>{stats.canceled}</h2>
          </div>
        </div>
      </div>
      <AppointmentChart status={stats} />
    </div>
  );
};

export default DoctorDashBoard;
