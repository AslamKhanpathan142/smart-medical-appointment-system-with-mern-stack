import React, { useState } from "react";
import "./DoctorProfile.css";
import { useEffect } from "react";
import DoctorProfile1 from '/DoctorProfile1.webp'
const DoctorProfile = ({showSpecifyDoctor, doctorData}) => {

  const [previewImage, setPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="doctor-profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar">
              {previewImage ? (
                <img src={previewImage} alt="Profile preview" />
              ) : (
                <div className="avatar-initials">
                  <img src={DoctorProfile1} className='imagePlace'/>
                </div>
              )}
            </div>
            <div className="upload-btn-wrapper">
              <button className="upload-btn">
                {previewImage ? "Change Photo" : "Upload Photo"}
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {editMode && <button className="remove-btn">Remove Photo</button>}
          </div>

          <div className="profile-actions">
            {!editMode ? (
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="action-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                <button className="save-btn" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <form className="profile-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={doctorData?.userId?.name || ""}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={doctorData?.userId?.email || ""}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label>Specialization</label>
                <select
                  name="specialization"
                  value={doctorData.specialization}
                  onChange={handleInputChange}
                  disabled={!editMode}
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>

              <div className="form-group">
                <label>Experience (years)</label>
                <input
                  type="text"
                  name="experience"
                  value={doctorData.experience}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {editMode && (
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DoctorProfile;
