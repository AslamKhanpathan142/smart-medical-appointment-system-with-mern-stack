import React, { useState, useEffect } from "react";
import styles from "./TestimonialsFAQ.module.css";
import { useOutletContext } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const TestimonialsFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { showFeedback, handleShowFeedback } = useOutletContext();

  useEffect(() => {
    handleShowFeedback();
  }, []);

  function timeAgo(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();

    const diffInMs = now - givenDate;
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30)); // rough month

    if (diffInMonths <= 0) return "Just now";
    if (diffInMonths === 1) return "1 month ago";
    return `${diffInMonths} months ago`;
  }

  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment by calling our reception at (555) 123-4567, using our online patient portal, or by clicking the 'Schedule Now' button in our website header.",
    },
    {
      question: "What insurance plans do you accept?",
      answer:
        "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and Medicare. Please contact our billing department for specific plan coverage details.",
    },
    {
      question: "What are your visiting hours?",
      answer:
        "General visiting hours are from 9:00 AM to 9:00 PM daily. For ICU and critical care units, visiting hours are 11:00 AM to 7:00 PM with a limit of two visitors at a time.",
    },
    {
      question: "How can I get a copy of my medical records?",
      answer:
        "You can request medical records by completing an authorization form at our medical records department, or through our secure patient portal. Please allow 3-5 business days for processing.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="testimonialsSection">
      <div className={styles.container}>
        <div className={styles.testimonialsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Patient Testimonials</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {showFeedback
              .filter((testimonial) => testimonial.visible === true)
              .slice(0, 2)
              .map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <h3 className={styles.testimonialName}>
                      {testimonial.patientId.name}
                    </h3>
                    <span className={styles.testimonialTime}>
                      {timeAgo(testimonial.createdAt)}
                    </span>
                  </div>

                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < testimonial.rating ? "" : "#b9b9b9"}
                        size={18}
                      />
                    ))}
                  </div>

                  <p className={styles.testimonialContent}>
                    {testimonial.message}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className={styles.faqToggle}>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                {activeIndex === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsFAQ;
