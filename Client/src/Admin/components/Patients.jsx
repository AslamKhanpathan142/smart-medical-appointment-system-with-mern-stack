import React, { useState } from "react";
import styles from "./Patients.module.css";
import {
  FaUserInjured,
  FaSearch,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Patients = ({ showAllAppointmentData, countPatient }) => {
  const reapetPatient = () => {
    const patientIds = showAllAppointmentData.map((a) => a.patientId._id);
    const duplicates = patientIds.filter(
      (id, index) => patientIds.indexOf(id) !== index
    );
    const duplicateCount = new Set(duplicates).size;
    return duplicateCount;
  };
  const patientsData = [
    {
      id: 1,
      count: countPatient(),
      total: "Total Patients",
      icon: <FaUserInjured />,
    },
    {
      id: 2,
      count: reapetPatient(),
      total: "Repeat Patients",
      icon: <FaCalendarAlt />,
    },
    {
      id: 3,
      count: showAllAppointmentData.length / countPatient(),
      total: "Avg Appointments",
      icon: <FaCalendarAlt />,
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.patientDashboard}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.headerIcon}>
            <FaUserInjured />
          </div>
          <div>
            <h1>Patient Management</h1>
            <p>View and manage your patient records</p>
          </div>
        </div>
      </div>

      <div className={styles.searchStats}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search patients..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.statsContainer}>
          {patientsData.map((data) => (
            <div className={styles.statCard} key={data.id}>
              <div className={styles.statIcon}>{data.icon}</div>
              <div>
                <span>{data.total}</span>
                <h3>{data.count}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.patientsTable}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Contact</th>
              <th>Registered Date</th>
            </tr>
          </thead>
          <tbody>
            {showAllAppointmentData.map((patient) => (
              <tr key={patient._id} className={styles.tableRow}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatarPlaceholder}>
                      {patient?.patientId?.name.charAt(0)}
                    </div>
                    <div className={styles.name}>
                      {patient?.patientId?.name}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <FaEnvelope className={styles.contactIcon} />
                      <span>{patient?.patientId?.email}</span>
                    </div>
                    <div className={styles.contactItem}>
                      <FaPhone className={styles.contactIcon} />
                      <span>{patient?.patientId?.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.dateCell}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <span>{formatDate(patient.createdAt)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAllAppointmentData.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FaUserInjured />
          </div>
          <h3>No patients found</h3>
          <p>Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
