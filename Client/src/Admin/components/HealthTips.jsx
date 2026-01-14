import React, { useEffect, useState } from "react";
import styles from "./HealthTips.module.css";

const HealthTips = () => {
    const [showTips, setShowTips] = useState([])
    const showHealthTips = async() =>{
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/healthTips/showAllHealthTips`);
            const data = await res.json()
            setShowTips(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        showHealthTips()
    },[])
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Health Tips</h2>
      <div className={styles.grid}>
        {showTips.map((tip, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.title}>{tip.title}</h3>
            <p className={styles.description}>{tip.description}</p>
            <div className={styles.footer}>
              <div>
                <p className={styles.doctorName}>Dr. {tip?.createdBy?.name || "UnKnown Doctor"}</p>
                <p className={styles.doctorEmail}>{tip?.createdBy?.email || "UnKnown Email"}</p>
              </div>
              <p className={styles.date}>
                {new Date(tip.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
