import { useState } from "react";
import styles from "./Feedbacks.module.css";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";

const Feedbacks = () => {
  const [showMessage, setShowMessage] = useState([]);
  const [showFeedback, setShowFeedback] = useState([]);

  const showAllFeedback = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback/showFeedback`);
      const data = await res.json();
      setShowFeedback(data);
    } catch (error) {
      alert(error);
    }
  };

  const handleShowFeedback = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/feedback/updatedFeedback/${id}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      setShowMessage(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    showAllFeedback();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>User Feedbacks Show On User Panel</h2>
      <div className={styles.grid}>
        {showFeedback.map(
          (fb, id) =>
            fb.visible === true && (
              <div key={id} className={styles.card}>
                <div className={styles.header}>
                  <h3 className={styles.subject}>{fb.subject}</h3>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < fb.rating ? "#ffc107" : "#b9b9b9"}
                        size={18}
                      />
                    ))}
                  </div>
                </div>

                <p className={styles.message}>{fb.message}</p>

                <div className={styles.footer}>
                  <span className={styles.name}>{fb.patientId.name}</span>
                  <span className={styles.email}>{fb.patientId.email}</span>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.btn} ${styles.showBtn}`}
                    onClick={() => handleShowFeedback(fb._id)}
                  >
                    Hide
                  </button>
                </div>
              </div>
            )
        )}
      </div>
      <hr />
      <h2 className={styles.heading}>User Feedbacks Hide On User Panel</h2>
      <div className={styles.grid}>
        {showFeedback.map(
          (fb, id) =>
            fb.visible === false && (
              <div key={id} className={styles.card}>
                <div className={styles.header}>
                  <h3 className={styles.subject}>{fb.subject}</h3>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < fb.rating ? "#ffc107" : "#b9b9b9;"}
                        size={18}
                      />
                    ))}
                  </div>
                </div>

                <p className={styles.message}>{fb.message}</p>

                <div className={styles.footer}>
                  <span className={styles.name}>{fb.patientId.name}</span>
                  <span className={styles.email}>{fb.patientId.email}</span>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.btn} ${styles.showBtn}`}
                    onClick={() => handleShowFeedback(fb._id)}
                  >
                    Show
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
