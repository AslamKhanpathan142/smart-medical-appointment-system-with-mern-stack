import React, { useState, useEffect } from "react";
import styles from "./DashBoard.module.css";
import ModernChart from "./ModernChart";

const Dashboard = ({ showAllAppointmentData, countPatient, doctors }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's your system overview</p>
      </div>
      <ModernChart
        showAllAppointmentData={showAllAppointmentData}
        countPatient={countPatient}
        doctors={doctors}
      />
    </div>
  );
};

export default Dashboard;
