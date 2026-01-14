import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

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

    if (loginError) setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setLoginError("");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/patient/useLogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        window.dispatchEvent(new Event("auth"));

        if (data.user.role === "admin") {
          navigate("/AdminHome");
        } else if (data.user.role === "doctor") {
          navigate("/DoctorAdmin");
        } else {
          navigate("/Profile");
        }
      } else {
        if (!res.ok) {
          setError(data.message || "Something went wrong");
          return;
        }
      }

      setFormData({
        name: "",
        email: "",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>SM</div>
          <h1 className={styles.title}>Smart Medical</h1>
        </div>

        <div className={styles.header}>
          <h2>Sign in to your account</h2>
          <p>Access your healthcare services and information</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {loginError && (
            <div className={styles.loginError}>
              <span>!</span>
              <p>{loginError}</p>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ""}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.errorInput : ""}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.rememberForgot}>
            <label className={styles.remember}>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>

        <div className={styles.registerLink}>
          Don't have an account? <NavLink to="/Register">Register now</NavLink>
        </div>
      </div>

      <div className={styles.footerNote}>
        <p>© {new Date().getFullYear()} Smart Medical. All rights reserved.</p>
        <div className={styles.links}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
