import React, { useState } from "react";
import styles from "./Appointments.module.css";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaTrash,
} from "react-icons/fa";

const Appointments = ({
  showAllAppointmentData,
  statusCounts,
  setshowAllAppointmentData,
}) => {
  
  const deleteAppointment = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/deleteAppointment/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setshowAllAppointmentData((prev) =>
          prev.filter((app) => app._id !== id)
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const appointmentData = [
    {
      id: 1,
      count: showAllAppointmentData.length,
      total: "Total Appointments",
      icon: (
        <FaCalendarAlt
          style={{
            backgroundColor: "rgba(67, 97, 238, 0.1)",
            color: "#4361ee",
          }}
        />
      ),
    },
    {
      id: 2,
      count: statusCounts.pending,
      total: "Pending",
      icon: <FaClock style={{ color: "#2ecc71" }} />,
    },
    {
      id: 3,
      count: statusCounts.confirmed,
      total: "Confirmed",
      icon: <FaUserMd style={{ color: "#3498db" }} />,
    },
    {
      id: 3,
      count: statusCounts.cancelled,
      total: "Cancelled",
      icon: <FaUserInjured style={{ color: "#e74c3c" }} />,
    },
  ];

  return (
    <div className={styles.appointmentDashboard}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.headerIcon}>
            <FaCalendarAlt />
          </div>
          <div>
            <h1>Appointment Management</h1>
            <p>View and manage patient appointments</p>
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <FaClock className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search appointments..."
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        {appointmentData.map((data) => (
          <div className={styles.statCard} key={data.id}>
            <div className={styles.statIcon}>{data.icon}</div>
            <div>
              <span>{data.total}</span>
              <h3>{data.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showAllAppointmentData.map((appointment) => (
              <tr key={appointment._id} className={styles.tableRow}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatarPlaceholder}>
                      {appointment?.patientId?.name.charAt(0)}
                    </div>
                    <div className={styles.name}>
                      {appointment?.patientId?.name}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.doctorAvatar}>
                      {appointment?.doctorId?.userId?.name.charAt(4)}
                    </div>
                    <div className={styles.name}>
                      {appointment.doctorId?.userId?.name || "Unkown"}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.datetime}>
                    <div className={styles.date}>
                      {appointment?.appointmentDate}
                    </div>
                    <div className={styles.time}>
                      <FaClock className={styles.clockIcon} />
                      {appointment.appointmentTime}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      appointment.status === "pending"
                        ? styles.upcoming
                        : appointment.status === "confirmed"
                        ? styles.completed
                        : styles.cancelled
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => deleteAppointment(appointment._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
