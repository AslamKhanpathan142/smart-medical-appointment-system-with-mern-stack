import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaLinkedinIn, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>About Smart Medical</h3>
          <p className={styles.footerText}>
            Providing exceptional healthcare services with compassion and expertise. 
            Our dedicated team is committed to your health and well-being.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link to='Doctors' className={styles.footerLink}>Find Doctors</Link></li>
            <li><a href="#FeaturedDoctors" className={styles.footerLink}>Featured Doctors</a></li>
            <li><a href="#testimonialsSection" className={styles.footerLink}>FAQs</a></li>
            <li><a href="#services" className={styles.footerLink}>Services</a></li>
            <li><a href="#" className={styles.footerLink}>Patient Portal</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Contact Info</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <span>(555) 123-4567</span>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <span>info@smartmedical.com</span>
            </div>
            <div className={styles.contactItem}>
              <span>123 Medical Center Drive</span>
            </div>
            <div className={styles.contactItem}>
              <span>Healthville, HV 12345</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink} aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className={styles.socialLink} aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
        
        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()} Smart Medical. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;