import React, { useState } from "react";
import styles from "./DoctorProfile.module.css";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaStethoscope,
} from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import DoctorProfile1 from "/DoctorProfile1.webp";

const DoctorProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingReason, setBookingReason] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [doctorData, setDoctorData] = useState(doctor);
  const [loading, setLoading] = useState(false);

  if (!doctorData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Doctor information not found</h2>
        <p>Please go back and select a doctor again.</p>
      </div>
    );
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !bookingReason) {
      alert("Please select date, time, and reason for your visit");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/bookAppointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctorId: doctorData._id,
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
            slotId: selectedSlotId,
            reason: bookingReason,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setBookingSuccess(true);

        setDoctorData((prev) => ({
          ...prev,
          ...data.updatedDoctor,
          userId: prev.userId,
        }));
        setTimeout(() => {
          setShowBookingModal(false);
          setBookingSuccess(false);
          setBookingReason("");
        }, 2000);
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (error) {
      setLoading(false);
      console.error("❌ Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <img
              src={doctorData?.img || DoctorProfile1}
              className={styles.imagePlace}
            />
          </div>

          <div className={styles.profileInfo}>
            <h1>{doctorData?.userId?.name || "Doctor"}</h1>

            <div className={styles.specialization}>
              <FaUserMd className={styles.icon} />
              <span>{doctorData.specialization}</span>
            </div>

            <div className={styles.experience}>
              <FaStethoscope className={styles.icon} />
              <span>{doctorData.experience} years</span>
            </div>

            <div className={styles.location}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>{doctorData.locationDr}</span>
            </div>

            <button
              className={styles.bookButton}
              onClick={() => setShowBookingModal(true)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>{doctorData?.userId?.name}</h2>
          <p>{doctorData.about}</p>
        </div>

        <div className={styles.section}>
          <h2>Education & Qualifications</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>{doctorData.qualification}</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Available Time Slots</h2>
          <div className={styles.availabilityContainer}>
            {(doctorData?.availableSlots ?? []).map((day, index) => (
              <div key={day._id || index} className={styles.availabilityCard}>
                <div className={styles.dateHeader}>
                  <FaCalendarAlt className={styles.icon} />
                  <span>{day.date}</span>
                </div>

                <div className={styles.timeSlots}>
                  {(day?.slots ?? []).map((slot) => (
                    <div
                      key={slot._id}
                      className={`${styles.timeSlot} ${
                        selectedDate === day.date &&
                        selectedTime === `${slot.start} - ${slot.end}`
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime(`${slot.start} - ${slot.end}`);
                        setSelectedSlotId(slot._id);
                      }}
                    >
                      <FaClock className={styles.icon} />
                      <span>
                        {slot.start} - {slot.end}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.bookingModal}>
            {bookingSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h2>Appointment Booked!</h2>

                <p>
                  Your appointment with {doctorData?.userId?.name} is confirmed.
                </p>

                <div className={styles.bookingDetails}>
                  <p>
                    <strong>Date:</strong> {selectedDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                  <p>
                    <strong>Reason:</strong> {bookingReason}
                  </p>
                </div>

                <button
                  className={styles.closeButton}
                  onClick={() => setShowBookingModal(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2>
                  Book Appointment with {doctorData?.userId?.name || "Doctor"}
                </h2>

                <div className={styles.bookingInfo}>
                  <p>
                    <strong>Selected Date:</strong>{" "}
                    {selectedDate || "None selected"}
                  </p>
                  <p>
                    <strong>Selected Time:</strong>{" "}
                    {selectedTime || "None selected"}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Reason for Visit</label>
                  <textarea
                    value={bookingReason}
                    onChange={(e) => setBookingReason(e.target.value)}
                    placeholder="Please describe the reason"
                    rows="4"
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.confirmButton}
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || loading}
                  >
                    {loading ? "Booking..." : "Confirm Appointment"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
