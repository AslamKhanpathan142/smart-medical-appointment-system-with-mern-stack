import React, { useEffect, useRef } from 'react';
import styles from './Home.module.css'
import Services from '../components/Services';
import FeaturedDoctors from '../components/FeaturedDoctors';
import HealthTips from '../components/HealthTips';
import TestimonialsFAQ from '../components/TestimonialsFAQ.module';
import { useNavigate } from "react-router-dom";
import home1 from "/home.webp";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.animateOnLoad}`);
    elements.forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });
  }, []);
  return (
   <>
   <div style={{zIndex: 99}}>
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={`${styles.headingContainer} ${styles.animateOnLoad}`}>
          <h1 className={styles.heading}>
            <span className={styles.line}>Your Health,</span>
            <span className={styles.line}>Our Priority</span>
          </h1>
          <div className={styles.subheading}>Comprehensive Healthcare Services for Every Stage of Life</div>
        </div>
        
        <div className={styles.ctaButtons}>
          <button className={`${styles.primaryCta} ${styles.animateOnLoad}`}  onClick={() => navigate("/Doctors")}>Book an Appointment</button>
          <button className={`${styles.secondaryCta} ${styles.animateOnLoad}`}  onClick={() => navigate("/about")}>About Us</button>
        </div>
      </div>
      
      <div className={styles.heroImage}>
        <div className={styles.imagePlaceholder}>
          <img src={home1} alt="" />
        </div>
      </div>
    </section>

    <Services/>
    <FeaturedDoctors/>
    <HealthTips/>
    <TestimonialsFAQ/>
    </div>
   </>
  )
}

export default Home
