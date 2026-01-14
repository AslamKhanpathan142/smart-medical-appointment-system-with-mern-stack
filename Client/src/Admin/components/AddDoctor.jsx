import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./AddDoctor.module.css";

const AddDoctor = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    about: "",
    locationDr: "",
    qualification: "",
    availableDays: [],
    startTime: "",
    endTime: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        availableDays: [...prev.availableDays, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        availableDays: prev.availableDays.filter((day) => day !== value),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required";
    }
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    }
    if (!formData.about) {
      newErrors.about = "About is required";
    }
    if (!formData.locationDr) {
      newErrors.locationDr = "Location is required";
    }
    if (!formData.qualification) {
      newErrors.qualification = "Qualification is required";
    }
    if (formData.availableDays.length === 0) {
      newErrors.availableDays = "AvailableDays is required";
    }
    if (!formData.startTime) {
      newErrors.startTime = "startTime is required";
    }
    if (!formData.endTime) {
      newErrors.endTime = "EndTime is required";
    }

    return newErrors;
  };

  const addDoctorHandle = async (e) => {
    const formErrors = validateForm();
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/addDoctor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.autoPassword)
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        about: "",
        locationDr: "",
        qualification: "",
        availableDays: [],
        startTime: "",
        endTime: "",
      });
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <form className={styles.addDoctorForm} onSubmit={addDoctorHandle}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Firstname Lastname"
                className={styles.formInput}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@example.com"
                className={styles.formInput}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={styles.formInput}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Experience (years)</label>
              <input
                type="number"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="5"
                min="1"
                className={styles.formInput}
              />
              {errors.experience && (
                <span className={styles.error}>{errors.experience}</span>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Specialization</label>
              <select
                id="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={styles.formInput}
              >
                <option value="">Select specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Oncology">Oncology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Dentist">Dentist</option>
              </select>
              {errors.specialization && (
                <span className={styles.error}>{errors.specialization}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Qualification</label>
              <input
                type="text"
                id="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="MBBS, MD, etc."
                className={styles.formInput}
              />
              {errors.qualification && (
                <span className={styles.error}>{errors.qualification}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>About</label>
            <textarea
              id="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Short bio of the doctor"
              className={styles.formInput}
              rows="3"
            />
            {errors.about && (
              <span className={styles.error}>{errors.about}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              id="locationDr"
              value={formData.locationDr}
              onChange={handleChange}
              placeholder="Hospital/Clinic location"
              className={styles.formInput}
            />
            {errors.locationDr && (
              <span className={styles.error}>{errors.locationDr}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Available Days</label>
            <div className={styles.daysSelector}>
              {days.map((day) => (
                <div key={day} className={styles.dayOption}>
                  <input
                    type="checkbox"
                    id={`day-${day}`}
                    value={day}
                    checked={formData.availableDays.includes(day)}
                    onChange={handleDayChange}
                  />
                  <label htmlFor={`day-${day}`}>{day}</label>
                  {errors.availableDays && (
                    <span className={styles.error}>{errors.availableDays}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Start Time</label>
              <input
                type="time"
                id="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={styles.formInput}
              />
              {errors.startTime && (
                <span className={styles.error}>{errors.startTime}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>End Time</label>
              <input
                type="time"
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={styles.formInput}
              />
              {errors.endTime && (
                <span className={styles.error}>{errors.endTime}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Profile Image (Optional)</label>
            <div className={styles.uploadContainer}>
              <div className={styles.uploadPlaceholder}>
                <span>Click to upload or drag and drop</span>
                <span>JPG, PNG (max. 2MB)</span>
              </div>
              <input
                type="file"
                className={styles.fileInput}
                accept="image/*"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setActiveTab("doctors")}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
