import React, { useState, useEffect } from "react";
import styles from "./AppointmentsPage.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";

import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaTimes,
  FaCheck,
  FaInfoCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [viewingAppointment, setViewingAppointment] = useState(null);

  const myAppointment = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/showPatientAppointment`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setAppointments(data.showPatientAppointment || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    myAppointment();
  }, []);

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleReschedule = (doctorId, doctorData) => {
    navigate(`/doctors/${doctorId}`, {
      state: { doctor: doctorData },
    });
  };

  const confirmCancellation = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/cancelAppointment/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === id ? { ...appt, status: "cancelled" } : appt
          )
        );
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error("Error cancelling:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleViewDetails = (appointment) => setViewingAppointment(appointment);
  const closeDetails = () => setViewingAppointment(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return styles.statusUpcoming;
      case "confirmed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Appointments</h1>
        <p>Manage your upcoming, completed, and cancelled appointments</p>
      </div>

      <div className={styles.appointmentsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Doctor</div>
          <div className={styles.headerCell}>Date & Time</div>
          <div className={styles.headerCell}>Status</div>
          <div className={styles.headerCell}>Actions</div>
          <div className={styles.headerCell}>Resheduling</div>
        </div>

        {appointments.map((appointment) => (
          <div key={appointment._id} className={styles.tableRow}>
            <div className={styles.tableCell}>
              <div className={styles.doctorInfo}>
                {appointment?.doctorId?.image ? (
                  <img
                    src={appointment.doctorId.image}
                    alt={appointment.doctorId.userId.name}
                    className={styles.doctorImage}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FaUserMd />
                  </div>
                )}
                <div>
                  <div className={styles.doctorName}>
                    {appointment?.doctorId?.userId?.name ||
                      "Doctor is Not Available"}
                  </div>
                  <div className={styles.specialization}>
                    {appointment?.doctorId?.specialization || " "}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.tableCell}>
              <div className={styles.dateTime}>
                <FaCalendarAlt className={styles.icon} />
                <span>{appointment?.appointmentDate || " "}</span>
              </div>
              <div className={styles.dateTime}>
                <FaClock className={styles.icon} />
                <span>{appointment?.appointmentTime || " "}</span>
              </div>
            </div>

            <div className={styles.tableCell}>
              <div
                className={`${styles.status} ${getStatusClass(
                  appointment.status
                )}`}
              >
                {appointment?.status || " "}
              </div>
            </div>

            <div className={styles.tableCell}>
              <div className={styles.actions}>
                {appointment.status === "pending" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleCancelClick(appointment)}
                  >
                    <FaTimes /> Cancel
                  </button>
                )}
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewDetails(appointment)}
                >
                  <FaInfoCircle /> View
                </button>
              </div>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className={styles.noAppointments}>
            <p>You don't have any appointments scheduled.</p>
            <button
              className={styles.bookButton}
              onClick={() => navigate("/Doctors")}
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>

      {showCancelModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.cancelModal}>
            <h2>Cancel Appointment</h2>
            <p>
              Are you sure you want to cancel your appointment with{" "}
              {selectedAppointment?.doctorId?.userId?.name || "Doctor"}?
            </p>

            <div className={styles.appointmentInfo}>
              <div>
                <FaCalendarAlt className={styles.icon} />
                <span>
                  {selectedAppointment?.appointmentDate || " "} at{" "}
                  {selectedAppointment?.appointmentTime || " "}
                </span>
              </div>
              <div>
                <FaUserMd className={styles.icon} />
                <span>
                  {selectedAppointment?.doctorId?.specialization || " "}
                </span>
              </div>
            </div>

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelModalButton}
                onClick={() => setShowCancelModal(false)}
              >
                Go Back
              </button>
              <button
                className={styles.confirmCancelButton}
                onClick={() => confirmCancellation(selectedAppointment._id)}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className={styles.toast}>
          <FaCheck className={styles.toastIcon} />
          <span>Appointment Cancelled Successfully</span>
        </div>
      )}

      {viewingAppointment && (
        <div className={styles.detailsOverlay}>
          <div className={styles.detailsModal}>
            <div className={styles.detailsHeader}>
              <h2>Appointment Details</h2>
              <button className={styles.closeButton} onClick={closeDetails}>
                &times;
              </button>
            </div>

            <div className={styles.doctorSection}>
              <div className={styles.doctorHeader}>
                {viewingAppointment?.doctorId?.image ? (
                  <img
                    src={viewingAppointment.doctorId.image}
                    alt={viewingAppointment.doctorId.userId.name}
                    className={styles.doctorImage}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FaUserMd />
                  </div>
                )}
                <div>
                  <h3>{viewingAppointment?.doctorId?.userId?.name || " "}</h3>
                  <p>{viewingAppointment?.doctorId?.specialization || " "}</p>
                </div>
              </div>

              <div className={styles.location}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{viewingAppointment?.doctorId?.locationDr || " "}</span>
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailCard}>
                <h4>Date & Time</h4>
                <div className={styles.detailContent}>
                  <FaCalendarAlt className={styles.icon} />
                  <div>
                    <div>{viewingAppointment?.appointmentDate || " "}</div>
                    <div>{viewingAppointment?.appointmentTime || " "}</div>
                  </div>
                </div>
              </div>

              <div className={styles.detailCard}>
                <h4>Status</h4>
                <div
                  className={`${styles.status} ${getStatusClass(
                    viewingAppointment.status
                  )}`}
                >
                  {viewingAppointment?.status || " "}
                </div>
              </div>

              {viewingAppointment.notes && (
                <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                  <h4>Doctor's Notes</h4>
                  <div className={styles.notes}>
                    {viewingAppointment?.notes || " "}
                  </div>
                </div>
              )}
            </div>

            {viewingAppointment.status === "pending" && (
              <div className={styles.actionButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setViewingAppointment(null);
                    handleCancelClick(viewingAppointment);
                  }}
                >
                  <FaTimes /> Cancel Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
