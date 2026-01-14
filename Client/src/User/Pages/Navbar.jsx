import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const update = () => setIsLoggedIn(!!localStorage.getItem("token"));

    window.addEventListener("storage", update);
    window.addEventListener("auth", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("auth", update);
    };
  }, []);
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>YW HealthFirst</div>

      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="Doctors"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Doctors
        </NavLink>
        <NavLink
          to="About"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          About
        </NavLink>
        <NavLink
          to="Contact"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Contact
        </NavLink>
      </div>

      {isLoggedIn ? (
        <NavLink
          to="Profile"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Profile
        </NavLink>
      ) : (
        <NavLink to="Register" className={styles.scheduleButton}>
          Register Now
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
