import React, { useState } from "react";
import styles from "./AppointmentsDashboard.module.css";
import {
  FaCalendarAlt,
  FaClock,
  FaUserInjured,
  FaFilter,
  FaSearch,
  FaCheck,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";

const AppointmentsDashboard = ({ appointments }) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointmentList, setAppointmentList] = useState(appointments);

  const confirmAppointment = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/confirmAppointment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAppointmentList((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: "confirmed" } : a))
        );
      } else {
        console.error("Error confirming:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/cancelAppointment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAppointmentList((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a))
        );
      } else {
        console.error("Error cancelling:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const filteredAppointments = appointmentList.filter((appointment) => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch =
      appointment.patientId.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.patientId.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "confirmed":
        return {
          text: "Confirmed",
          color: "#2ecc71",
          bgColor: "#e6f7ee",
          icon: <FaCheck />,
        };
      case "pending":
        return {
          text: "Pending",
          color: "#f39c12",
          bgColor: "#fef7e6",
          icon: <FaSpinner />,
        };
      case "cancelled":
        return {
          text: "Cancelled",
          color: "#e74c3c",
          bgColor: "#fef0f0",
          icon: <FaTimes />,
        };
      default:
        return { text: "Unknown", color: "#7f8c8d", bgColor: "#f0f2f5" };
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Appointments Dashboard</h1>
          <p>Manage and view your upcoming patient appointments</p>
        </div>
        <div className={styles.headerRight}></div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            <FaFilter /> All Appointments
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "confirmed" ? styles.active : ""
            }`}
            onClick={() => setFilter("confirmed")}
          >
            Confirmed
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "pending" ? styles.active : ""
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`${styles.filterButton} ${
              filter === "cancelled" ? styles.active : ""
            }`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className={styles.appointmentsGrid}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => {
            const statusDetails = getStatusDetails(appointment.status);

            return (
              <div key={appointment._id} className={styles.appointmentCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.dateTime}>
                    <div className={styles.date}>
                      <FaCalendarAlt className={styles.icon} />
                      <span>{formatDate(appointment?.appointmentDate)}</span>
                    </div>
                    <div className={styles.time}>
                      <FaClock className={styles.icon} />
                      <span>{appointment?.appointmentTime}</span>
                    </div>
                  </div>
                  <div
                    className={styles.status}
                    style={{
                      color: statusDetails.color,
                      backgroundColor: statusDetails.bgColor,
                    }}
                  >
                    {statusDetails.icon}
                    <span>{statusDetails.text}</span>
                  </div>
                </div>

                <div className={styles.patientInfo}>
                  <div className={styles.avatar}>
                    {appointment?.patientId?.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className={styles.patientName}>
                      {appointment?.patientId?.name}
                    </h3>
                    <p className={styles.reason}>
                      {appointment?.patientId?.email}
                    </p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.primaryBtn}
                    onClick={() => confirmAppointment(appointment._id)}
                  >
                    confirm
                  </button>
                  <button
                    className={styles.menuBtn}
                    onClick={() => cancelAppointment(appointment._id)}
                  >
                    cancel
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FaUserInjured />
            </div>
            <h3>No appointments found</h3>
            <p>Try changing your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
