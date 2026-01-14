import React, { useState } from "react";
import styles from "./AddHealthTip.module.css";

const AddHealthTip = ({ onSubmit, setActiveTab }) => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/healthTips/addHealthTip`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      alert(data.message);
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Health Tip</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter health tip title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write the health tip description..."
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.button}>
          Add Tip
        </button>
        <button
          className={styles.button}
          onClick={() => setActiveTab("HealthTips")}
        >
          Cencel
        </button>
      </form>
    </div>
  );
};

export default AddHealthTip;
