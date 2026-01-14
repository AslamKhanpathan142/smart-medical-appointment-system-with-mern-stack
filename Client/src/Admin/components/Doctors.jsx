import React, { useState, useEffect } from "react";
import styles from "./Doctors.module.css";
import {
  FaTrash,
  FaClock,
  FaCalendarAlt,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

const Doctors = ({ setActiveTab, setDoctors, doctors }) => {
  const deleteDoctor = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/deleteDoctor/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
    } else {
      console.error(data.message);
    }
  };

  const [isActive, setIsActive] = useState({ Active: 0, Inactive: 0 });

  const isActiveDays = (days) => {
    if (!days) return "Inactive";
    let daysArr = [];

    if (Array.isArray(days)) daysArr = days;
    else if (typeof days === "string") {
      daysArr = days
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
    } else {
      return "Inactive";
    }
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = weekDays[new Date().getDay()];

    return daysArr.includes(today) ? "Active" : "Inactive";
  };

  const countActiveInactive = () => {
    if (!Array.isArray(doctors) || doctors.length === 0) {
      setIsActive({ Active: 0, Inactive: 0 });
      return;
    }

    const counts = { Active: 0, Inactive: 0 };

    doctors.forEach((doctor) => {
      const availability = doctor.availableDays ?? doctor.days;
      const status = isActiveDays(availability);
      if (status === "Active") counts.Active++;
      else counts.Inactive++;
    });

    setIsActive(counts);
  };

  useEffect(() => {
    countActiveInactive();
  }, [doctors]);

  const appointmentData = [
    {
      id: 1,
      count: doctors.length,
      total: "Total Doctors",
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
      count: isActive.Active,
      total: "Active Doctors",
      icon: (
        <FaClock
          style={{
            backgroundColor: "rgba(46, 204, 113, 0.1)",
            color: "#2ecc71",
          }}
        />
      ),
    },
    {
      id: 3,
      count: isActive.Inactive,
      total: "Inactive Doctors",
      icon: (
        <FaUserMd
          style={{
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            color: "#3498db",
          }}
        />
      ),
    },
  ];

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.headerIcon}>
            <FaUserMd
              style={{
                color: "white",
              }}
            />
          </div>
          <div>
            <h1>Doctors Management</h1>
            <p>View and manage Doctors</p>
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <FaClock className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search doctors..."
              className={styles.searchInput}
            />
          </div>
        </div>
        <button
          className={styles.addButton}
          onClick={() => setActiveTab("AddDoctor")}
        >
          Add New Doctor
        </button>
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
        <table className={styles.doctorsTable}>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className={styles.tableRow}>
                <td>
                  <div className={styles.doctorInfo}>
                    <div className={styles.avatarPlaceholder}>
                      {doctor.userId.name.charAt(0)}
                    </div>
                    <div>
                      <div className={styles.name}>{doctor.userId.name}</div>
                      <div className={styles.email}>{doctor.userId.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.specializationBadge}>
                    {doctor.specialization}
                  </span>
                </td>
                <td>{doctor.experience}</td>
                <td>
                  <div className={styles.availability}>
                    <div className={styles.days}>
                      <FaCalendarAlt className={styles.calendarIcon} />
                      {doctor.availableDays.map((day, indx) => (
                        <span key={indx}>{day}</span>
                      ))}
                    </div>
                    <div className={styles.time}>
                      <FaClock className={styles.clockIcon} />
                      {doctor.availableSlots[0].date}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      isActiveDays(doctor.availableDays) === "Active"
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    {isActiveDays(doctor.availableDays)}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => deleteDoctor(doctor._id)}
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

export default Doctors;
