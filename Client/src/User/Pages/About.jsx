import React, { useEffect } from "react";
import styles from "./About.module.css";
import {
  FaHeartbeat,
  FaUserMd,
  FaHospital,
  FaAward,
  FaUsers,
  FaStethoscope,
} from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const About = () => {
  const { showFeedback, handleShowFeedback } = useOutletContext();
  useEffect(() => {
    handleShowFeedback();
  }, []);
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Our Commitment to Your Health</h1>
          <p>
            At Smart Medical, we've been providing exceptional healthcare with
            compassion and expertise since 2010.
          </p>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <h2>Our Journey in Healthcare</h2>
            <p>
              Founded in 2010 by Dr. Emily Chen and Dr. Michael Thompson, Smart
              Medical began as a small clinic with a big vision: to make quality
              healthcare accessible to everyone. What started with two
              physicians in a modest office has grown into a comprehensive
              healthcare network serving thousands of patients annually.
            </p>
            <p>
              Over the years, we've expanded our services, recruited top medical
              talent, and invested in cutting-edge technology—all while staying
              true to our founding principles of compassion, excellence, and
              patient-centered care.
            </p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <FaUserMd className={styles.statIcon} />
                <h3>120+</h3>
                <p>Specialized Doctors</p>
              </div>
              <div className={styles.statItem}>
                <FaHospital className={styles.statIcon} />
                <h3>8</h3>
                <p>Medical Facilities</p>
              </div>
              <div className={styles.statItem}>
                <FaUsers className={styles.statIcon} />
                <h3>250,000+</h3>
                <p>Patients Served</p>
              </div>
              <div className={styles.statItem}>
                <FaAward className={styles.statIcon} />
                <h3>15</h3>
                <p>Healthcare Awards</p>
              </div>
            </div>
          </div>
          <div className={styles.storyImage}></div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.container}>
          <h2>Our Mission & Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <FaHeartbeat className={styles.valueIcon} />
              <h3>Patient-Centered Care</h3>
              <p>
                We put patients first in everything we do, tailoring treatments
                to individual needs and preferences.
              </p>
            </div>
            <div className={styles.valueCard}>
              <FaStethoscope className={styles.valueIcon} />
              <h3>Clinical Excellence</h3>
              <p>
                Our commitment to evidence-based medicine ensures you receive
                the highest quality care available.
              </p>
            </div>
            <div className={styles.valueCard}>
              <FaHospital className={styles.valueIcon} />
              <h3>Community Focus</h3>
              <p>
                We're dedicated to improving the health and wellbeing of the
                communities we serve.
              </p>
            </div>
            <div className={styles.valueCard}>
              <FaAward className={styles.valueIcon} />
              <h3>Continuous Innovation</h3>
              <p>
                We embrace new technologies and treatments to provide
                cutting-edge healthcare solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2>Meet Our Leadership Team</h2>
          <p className={styles.sectionSubtitle}>
            Experienced professionals dedicated to your health
          </p>

          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}></div>
              <h3>Dr. Aslam Khan</h3>
              <p className={styles.position}>Founder & Chief Medical Officer</p>
              <p>
                Board-certified cardiologist with 20+ years of experience in
                patient care and healthcare administration.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}></div>
              <h3>Dr. Michael Thompson</h3>
              <p className={styles.position}>Co-Founder & CEO</p>
              <p>
                Healthcare executive with expertise in building patient-centered
                healthcare systems and facilities.
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}></div>
              <h3>Dr. Sarah Johnson</h3>
              <p className={styles.position}>Chief of Staff</p>
              <p>
                Renowned neurologist with a passion for improving patient
                outcomes through innovative care models.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.container}>
          <h2>What Our Patients Say</h2>
          <p className={styles.sectionSubtitle}>
            Real stories from people we've helped
          </p>
          <div className={styles.testimonialGrid}>
            {showFeedback
              .filter((visTrue) => visTrue.visible == true)
              .slice(0, 3)
              .map((item, indx) => (
                <div className={styles.testimonialCard} key={indx}>
                  <div className={styles.quote}>{item.message}</div>
                  <div className={styles.patientInfo}>
                    <div className={styles.patientAvatar}>
                      <p>{item.patientId.name.charAt(0)}</p>
                    </div>
                    <div>
                      <h4>{item.patientId.name}</h4>
                      <p>{item.subject}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Experience Our Care Difference</h2>
          <p>
            Join thousands of patients who trust us with their healthcare needs
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryCta}>Book an Appointment</button>
            <button className={styles.secondaryCta}>Find a Doctor</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
