import React, { useState } from "react";
import styles from "./Contact.module.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const Contact = () => {
  const [hover, setHover] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [backedMessage, setBackendMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleRating = (Currentrating) => {
    setFormData((prev) => ({ ...prev, rating: Currentrating }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.rating) {
      newErrors.rating = "currentRating is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/feedback/addFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setBackendMessage(data);
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setFormData({
            subject: "",
            message: "",
            rating: 0,
          });
          setIsSubmitted(false);
        }, 3000);
      }, 1500);
    }
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.pageHeader}>
        <h1>Contact Us</h1>
        <p>
          We're here to help. Reach out to us with any questions or concerns.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaMapMarkerAlt />
            </div>
            <h3>Our Location</h3>
            <p>123 Medical Center Drive</p>
            <p>Healthville, HV 12345</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaPhone />
            </div>
            <h3>Phone Number</h3>
            <p>Main: (555) 123-4567</p>
            <p>Emergency: (555) 987-6543</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaEnvelope />
            </div>
            <h3>Email Address</h3>
            <p>info@smartmedical.com</p>
            <p>support@smartmedical.com</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaClock />
            </div>
            <h3>Working Hours</h3>
            <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p>Saturday: 9:00 AM - 5:00 PM</p>
            <p>Emergency Services: 24/7</p>
          </div>
        </div>
        <div className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapOverlay}>
                <h3>Downtown Medical Center</h3>
                <p>123 Medical Center Drive</p>
                <p>Healthville, HV 12345</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <h2>Give Us Your Feedback</h2>
            <p>
              We’d love to know what worked well for you and where we can
              improve.
            </p>
          </div>

          {isSubmitted ? (
            <div>
              {backedMessage.success === true && (
                <div className={styles.successMessage}>
                  <FaCheckCircle className={styles.successIcon} />
                  <h3>{backedMessage.message}</h3>
                  <p>
                    “Thank you for your valuable feedback! It helps us improve
                    our services.”
                  </p>
                </div>
              )}
              {backedMessage.success === false && (
                <div className={styles.successMessage}>
                  <FaCircleXmark
                    className={styles.successIcon}
                    style={{ color: "#721c24" }}
                  />
                  <h3 style={{ color: "#721c24" }}>{backedMessage.message}</h3>
                  <p>
                    Your session has expired. Please login again to continue.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? styles.errorInput : ""}
                  placeholder="What is this regarding?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.errorInput : ""}
                  placeholder="Type your message here..."
                  rows="5"
                ></textarea>
                {errors.message && (
                  <span className={styles.error}>{errors.message}</span>
                )}
              </div>
              <div className={styles.formGroup1}>
                <div>
                  <label htmlFor="rating">How was your experience? *</label>
                </div>
                <br />
                <div style={{ display: "flex", gap: 15 }}>
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <br />
                        <input
                          type="radio"
                          className={styles.rate}
                          name="rating"
                          value={ratingValue}
                          onClick={() => handleRating(ratingValue)}
                        />
                        <FaStar
                          className={styles.star}
                          color={
                            ratingValue <= (hover || formData.rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          size={35}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                {errors.rating && (
                  <span className={styles.error}>{errors.rating}</span>
                )}
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? <span>Sending...</span> : <>Submit</>}
              </button>
            </form>
          )}
        </div>

        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How do I schedule an appointment?</h3>
              <p>
                You can schedule an appointment by calling our reception at
                (555) 123-4567, using our online patient portal, or through our
                website.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>What insurance plans do you accept?</h3>
              <p>
                We accept most major insurance plans including Aetna, Blue Cross
                Blue Shield, Cigna, UnitedHealthcare, and Medicare.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>How can I get my medical records?</h3>
              <p>
                You can request medical records by completing an authorization
                form at our medical records department or through our secure
                patient portal.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3>Do you offer telehealth services?</h3>
              <p>
                Yes, we offer telehealth appointments for many types of
                consultations. Contact our office to see if your visit can be
                done virtually.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
