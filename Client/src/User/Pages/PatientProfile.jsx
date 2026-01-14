import React, { useState, useRef } from "react";
import styles from "./PatientProfile.module.css";
import { FaUser, FaEnvelope, FaPhone, FaSave } from "react-icons/fa";
import AppointmentsPage from "./AppointmentsPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import patientProfile from "/patientProfile.png";

const PatientProfile = () => {
  const [profile, setProfile] = useState([]);

  const Userprofile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/patientProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setProfile(data.user || []);
    } catch (error) {
      console.error("Failed to fetch your profile:", err);
    }
  };
  useEffect(() => {
    Userprofile();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth"));
    navigate("/");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not logged in");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/updatePatientProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Profile</h1>
        <p>Manage your personal information and profile settings</p>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.photoSection}>
          <img src={patientProfile} alt="" />
        </div>

        <div className={styles.infoSection}>
          {successMessage && (
            <div className={styles.successMessage}>
              <FaSave /> {successMessage}
            </div>
          )}

          <div className={styles.infoGroup}>
            <label className={styles.infoLabel}>
              <FaUser /> Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <p className={styles.infoValue}>{profile.name}</p>
            )}
          </div>

          <div className={styles.infoGroup}>
            <label className={styles.infoLabel}>
              <FaEnvelope /> Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <p className={styles.infoValue}>{profile.email}</p>
            )}
          </div>

          <div className={styles.infoGroup}>
            <label className={styles.infoLabel}>
              <FaPhone /> Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <p className={styles.infoValue}>{profile.phone}</p>
            )}
          </div>

          <div className={styles.infoGroup}>
            <label className={styles.infoLabel}>Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <p className={styles.infoValue}>{profile.dob}</p>
            )}
          </div>

          <div className={styles.infoGroup}>
            <label className={styles.infoLabel}>Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                className={styles.textareaField}
                rows="3"
              />
            ) : (
              <p className={styles.infoValue}>{profile.address}</p>
            )}
          </div>

          <div className={styles.buttonGroup}>
            {isEditing ? (
              <>
                <button
                  className={styles.saveButton}
                  onClick={() => saveProfile()}
                >
                  <FaSave /> Update Profile
                </button>
                <button className={styles.cancelButton} onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <button className={styles.editButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <AppointmentsPage />
    </div>
  );
};

export default PatientProfile;
