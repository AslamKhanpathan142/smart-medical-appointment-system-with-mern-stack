import React, { useEffect } from "react";
import styles from "./HealthTips.module.css";

const HealthTips = ({ showHealthTips, showTips, setActiveTab }) => {
  return (
    <div className={styles.container}>
        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '20px'}}>
      <h2 className={styles.heading}>Health Tips</h2>
      <button onClick={() => setActiveTab("AddHealthTips")}  className={styles.button}>Add Tips</button>
      </div>
      <div className={styles.grid}>
        {showTips.map((tip, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.title}>{tip.title}</h3>
            <p className={styles.description}>{tip.description}</p>
            <div className={styles.footer}>
              <p className={styles.date}>
                {new Date(tip.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
