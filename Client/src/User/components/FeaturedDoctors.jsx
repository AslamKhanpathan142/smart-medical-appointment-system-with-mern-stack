import React from "react";
import styles from "./FeaturedDoctors.module.css";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import DoctorProfile from "/DoctorProfile1.webp";
import { useNavigate } from "react-router-dom";

const FeaturedDoctors = () => {
  const { doctorCards, doctors } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    doctorCards();
  }, []);

  return (
    <>
      <section className={styles.section} id="FeaturedDoctors">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Doctors</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.doctorsGrid}>
          {doctors.slice(-3).map((doctor, index) => (
            <div key={index} className={styles.doctorCard}>
              <div className={styles.avatarPlaceholder}>
                <img
                  src={doctor?.img || DoctorProfile}
                  alt={doctor.userId.name.charAt(6)}
                  className={styles.imagePlace}
                />
              </div>
              <h3 className={styles.doctorName}>{doctor.userId.name}</h3>
              <p className={styles.doctorSpecialty}>{doctor.specialization}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.heading}>
              Advanced Care, Compassionate Approach
            </h2>
            <p className={styles.subheading}>
              We are committed to excellence in patient care, research, and
              education.
            </p>
            <p className={styles.description}>
              Our hospital is equipped with state-of-the-art technology and
              staffed by experienced professionals dedicated to providing the
              highest quality care. We offer a wide range of medical services to
              meet your healthcare needs.
            </p>
            <div className={styles.ctaContainer}>
              <button
                className={styles.primaryButton}
                onClick={() => navigate("/about")}
              >
                Learn More About Us
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => navigate("/Contact")}
              >
                Take a Virtual Tour
              </button>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imagePlaceholder}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedDoctors;
