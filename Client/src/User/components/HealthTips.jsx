import React from "react";
import styles from "./HealthTips.module.css";
import { useState, useEffect } from "react";

const HealthTips = () => {
  const [showTips, setShowTips] = useState([]);
  const showHealthTips = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/healthTips/showAllHealthTips`
      );
      const data = await res.json();
      setShowTips(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showHealthTips();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Health Tips & Articles</h2>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.articlesGrid}>
        {showTips.slice(0, 4).map((article, index) => (
          <div key={index} className={styles.articleCard}>
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <p className={styles.articleDescription}>{article.description}</p>
            <div className={styles.footer}>
              <div>
                <p className={styles.doctorName}>
                  {article?.createdBy?.name || "UnKnown Doctor"}
                </p>
                <p className={styles.doctorEmail}>
                  {article?.createdBy?.email || "UnKnown Email"}
                </p>
              </div>
              <p className={styles.date}>
                {new Date(article.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthTips;
