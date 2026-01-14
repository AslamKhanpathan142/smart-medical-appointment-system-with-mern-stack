import React, { useEffect, useState } from "react";
import styles from "./Doctors.module.css";
import { NavLink, useOutletContext } from "react-router-dom";
import DoctorProfile from "/DoctorProfile1.webp";

const Doctors = () => {
  const { doctorCards, doctorsData, doctors, setDoctors } = useOutletContext();
  useEffect(() => {
    doctorCards();
  }, []);

  const specializations = [
    "All Specialties",
    "Cardiology",
    "Pediatrics",
    "Neurology",
    "Dermatology",
    "Orthopedic Surgeon",
    "Ophthalmologist",
    "Gynecology",
    "Dentist",
    "Psychiatry",
  ];

  const [filters, setFilters] = useState({
    specialization: "All Specialties",
    name: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterDoctors = () => {
    let filtered = [...doctorsData];

    if (filters.specialization !== "All Specialties") {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === filters.specialization
      );
    }

    if (filters.name) {
      filtered = filtered.filter((doctor) =>
        doctor.userId.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    setDoctors(filtered);
  };

  const resetFilters = () => {
    setFilters({
      specialization: "All Specialties",
      name: "",
    });
    setDoctors(doctorsData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Find the Right Doctor for You</h1>
        <p>Search from our network of experienced healthcare professionals</p>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchCard}>
          <h2>Search Doctors</h2>
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <label>Specialization</label>
              <select
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
              >
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Doctor name"
              />
            </div>
          </div>

          <div className={styles.actionRow}>
            <button className={styles.searchButton} onClick={filterDoctors}>
              Search Doctors
            </button>
            <button className={styles.resetButton} onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className={styles.resultsHeader}>
        <h2>{doctors.length} Doctors Available</h2>
        <p>Showing doctors matching your criteria</p>
      </div>

      <div className={styles.doctorsGrid}>
        {doctors.map((doctor) => (
          <div key={doctor._id} className={styles.doctorCard}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                <img
                  src={doctor?.img || DoctorProfile}
                  alt={doctor.userId.name.charAt(6)}
                  className={styles.imagePlace}
                />
              </div>
              <div className={styles.doctorInfo}>
                <h3>{doctor.userId.name}</h3>
                <p className={styles.specialty}>{doctor.specialization}</p>
              </div>
            </div>

            <div className={styles.cardDetails}>
              <div className={styles.detailItem}>
                <span>Experience</span>
                <span>{doctor.experience}</span>
              </div>
              <div className={styles.detailItem}>
                <span>Location</span>
                <span>{doctor.locationDr}</span>
              </div>
            </div>
            <NavLink
              to={`/doctors/${doctor._id}`}
              className={styles.profileButton}
              state={{ doctor }}
            >
              View Profile
            </NavLink>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className={styles.noResults}>
          <h3>No doctors match your search criteria</h3>
          <p>Try adjusting your filters or search terms</p>
          <button onClick={resetFilters}>Reset All Filters</button>
        </div>
      )}
    </div>
  );
};

export default Doctors;
