import React, { useState } from "react";
import "./AdminHome.css";
import DashBoard from "./components/DashBoard";
import Appointments from "./components/Appointments";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import AddDoctor from "./components/AddDoctor";
import Feedback from "./components/Feedbacks";
import HealthTips from "./components/HealthTips";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "/LOGO.svg";
import { useEffect } from "react";
const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAllAppointmentData, setshowAllAppointmentData] = useState([]);

  const handleAdminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("auth"));
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

  const showAllAppointment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/Appointment/showAllAppointment`
      );
      const data = await res.json();
      setshowAllAppointmentData(data.showAllAppointment || []);
      const counts = countAppointmentStatus(data.showAllAppointment || []);
      setStatusCounts(counts);
    } catch (error) {
      console.error(error);
    }
  };

  const [doctors, setDoctors] = useState([]);

  const doctorCards = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/doctor/showAllDoctors`
    );
    const data = await res.json();
    setDoctors(data);
  };
  useEffect(() => {
    doctorCards();
  }, []);

  const countPatient = () => {
    const uniquePatients = new Set(
      showAllAppointmentData.map((a) => a.patientId._id)
    );
    const patientCount = uniquePatients.size;
    return patientCount;
  };

  useEffect(() => {
    showAllAppointment();
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
                <span>📅</span> Appointments
              </li>
              <li
                className={activeTab === "patients" ? "active" : ""}
                onClick={() => setActiveTab("patients")}
              >
                <span>👥</span> Patients
              </li>
              <li
                className={
                  activeTab === "doctors" || activeTab === "AddDoctor"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("doctors")}
              >
                <span>👨‍⚕️</span> Doctors
              </li>
              <li
                className={activeTab === "Feedback" ? "active" : ""}
                onClick={() => setActiveTab("Feedback")}
              >
                <span>💬</span> Feedbacks
              </li>
              <li
                className={activeTab === "HealthTips" ? "active" : ""}
                onClick={() => setActiveTab("HealthTips")}
              >
                <span>🩺</span> HealthTips
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
              <span className="logout" onClick={handleAdminLogout}>
                Logout
              </span>
            </div>
          </header>
          <main className="main-content">
            {activeTab == "dashboard" && (
              <DashBoard
                showAllAppointmentData={showAllAppointmentData}
                countPatient={countPatient}
                doctors={doctors}
              />
            )}
            {activeTab == "appointments" && (
              <Appointments
                showAllAppointmentData={showAllAppointmentData}
                statusCounts={statusCounts}
                setshowAllAppointmentData={setshowAllAppointmentData}
              />
            )}
            {activeTab == "patients" && (
              <Patients
                showAllAppointmentData={showAllAppointmentData}
                countPatient={countPatient}
              />
            )}
            {activeTab == "doctors" && (
              <Doctors
                setActiveTab={setActiveTab}
                doctors={doctors}
                setDoctors={setDoctors}
              />
            )}
            {activeTab == "AddDoctor" && (
              <AddDoctor setActiveTab={setActiveTab} />
            )}
            {activeTab == "Feedback" && <Feedback />}
            {activeTab == "HealthTips" && <HealthTips />}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
