import React, { useState, useEffect } from "react";
import "./DoctorAdmin.css";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "/LOGO.svg";
import DoctorDashboard from "./components/DoctorDashBoard";
import AvailableSlots from "./components/AvailableSlots";
import AppointmentsDashboard from "./components/AppointmentsDashboard";
import DoctorProfile from "./components/DoctorProfile";
import HealthTips from "./components/HealthTips";
import AddHealthTip from "./components/AddHealthTip";

const DoctorAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showTips, setShowTips] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const token = localStorage.getItem("token");
  const showHealthTips = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/healthTips/showSpecifyDoctorHealthTips`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setShowTips(data);
    } catch (error) {
      console.error(error);
    }
  };
  const showSpecifyDoctor = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/doctor/showSpecifyDoctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setDoctorData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });
  const countAppointmentStatus = (appointments) => {
    let counts = { pending: 0, confirmed: 0, cancelled: 0 };

    appointments.forEach((app) => {
      if (app.status === "pending") counts.pending++;
      else if (app.status === "confirmed") counts.confirmed++;
      else if (app.status === "cancelled") counts.cancelled++;
    });

    return counts;
  };

  const showSpecifyAppointment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/showDoctorAppointment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAppointments(data.appointments || []);
      const counts = countAppointmentStatus(data.appointments || []);
      setStatusCounts(counts);
    } catch (error) {
      console.error(error);
    }
  };
  const HandleDoctorLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    showSpecifyDoctor();
    showHealthTips();
    showSpecifyAppointment();
  }, []);

  return (
    <>
      <div className="medical-dashboard">
        <div className="sidebar">
          <div className="logo">
            <img src={logo} alt="Medical System Logo" />
            <h1>MediCare</h1>
          </div>
          <nav>
            <ul>
              <li
                className={activeTab === "dashboard" ? "active" : ""}
                onClick={() => setActiveTab("dashboard")}
              >
                <span>🏠</span> Dashboard
              </li>
              <li
                className={activeTab === "appointments" ? "active" : ""}
                onClick={() => setActiveTab("appointments")}
              >
                <span>👥</span> Appointments
              </li>
              <li
                className={
                  activeTab === "HealthTips" || activeTab === "AddHealthTips"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("HealthTips")}
              >
                <span>🩺</span> HealthTips
              </li>
              <li
                className={activeTab === "Profile" ? "active" : ""}
                onClick={() => setActiveTab("Profile")}
              >
                <span>👨‍⚕️</span> Profile
              </li>
            </ul>
          </nav>
        </div>
        <div className="main">
          <header className="header">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
              <BiLogOutCircle
                style={{ color: "#2ecc71", width: "30px", height: "26px" }}
              />
              <span className="logout" onClick={HandleDoctorLogout}>
                Logout
              </span>
            </div>
          </header>
          <main className="main-content">
            {activeTab == "dashboard" && (
              <DoctorDashboard
                doctorData={doctorData}
                statusCounts={statusCounts}
                appointments={appointments}
              />
            )}
            {activeTab == "Available" && <AvailableSlots />}
            {activeTab == "appointments" && (
              <AppointmentsDashboard appointments={appointments} />
            )}
            {activeTab == "HealthTips" && (
              <HealthTips
                showHealthTips={showHealthTips}
                showTips={showTips}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab == "AddHealthTips" && (
              <AddHealthTip setActiveTab={setActiveTab} />
            )}
            {activeTab == "Profile" && (
              <DoctorProfile
                showSpecifyDoctor={showSpecifyDoctor}
                doctorData={doctorData}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default DoctorAdmin;
