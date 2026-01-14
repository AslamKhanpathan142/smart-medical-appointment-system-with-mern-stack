import React from "react";
import styles from "./Services.module.css";

const Services = () => {
  const services = [
    {
      title: "Emergency Care",
      description:
        "24/7 emergency services with a dedicated team of trauma specialists.",
      icon: "🚑",
    },
    {
      title: "Specialty Surgery",
      description:
        "Advanced surgical procedures performed by our expert surgeons.",
      icon: "🔪",
    },
    {
      title: "Family Medicine",
      description: "Comprehensive primary care for patients of all ages.",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      title: "Diagnostics Lab",
      description:
        "State-of-the-art laboratory for accurate and fast test results.",
      icon: "🔬",
    },
  ];

  return (
    <section className={styles.services} id="services">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div
            key={index}
            className={styles.serviceCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.icon}>{service.icon}</div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
