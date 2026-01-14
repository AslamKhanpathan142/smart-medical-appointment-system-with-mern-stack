import { useEffect, useState} from "react";
import AdminHome from "./Admin/AdminHome";
import DoctorAdmin from "./Doctor/DoctorAdmin";
import Navbar from "./User/Pages/Navbar";
import Home from "./User/Pages/Home";
import Footer from "./User/Pages/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const [showFeedback, setShowFeedback] = useState([])
  const [doctorsData, setDoctorsData] = useState([]);
  const [doctors, setDoctors] = useState(doctorsData);

  const doctorCards = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/showAllDoctors`);
    const data = await res.json();
    setDoctors(data);
    setDoctorsData(data);
  };

  const handleShowFeedback = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback/showFeedback`);
      const data = await res.json()
      setShowFeedback(data)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <Outlet context={{
        doctorCards,
        doctorsData,
        doctors,
        setDoctors,
        setDoctorsData,
        showFeedback,
        handleShowFeedback
      }}/>
      <Footer />
    </>
  );
};

export default App;
