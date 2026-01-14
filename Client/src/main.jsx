import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./User/Pages/Home.jsx";
import About from "./User/Pages/About.jsx";
import Contact from "./User/Pages/Contact.jsx";
import Register from "./User/Pages/Register.jsx";
import Doctors from "./User/Pages/Doctors.jsx";
import LoginPage from "./User/Pages/LoginPage.jsx";
import DoctorProfile from "./User/Pages/DoctorProfile.jsx";
import PatientProfile from "./User/Pages/PatientProfile.jsx";
import ProtectedRoute from "./User/components/ProtectedRoute.jsx";
import AdminHome from "./Admin/AdminHome.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";
import AdminRoute from "./Admin/AdminRoute.jsx";
import UserRoute from "./Admin/components/UserRoute.jsx";
import DoctorAdmin from "./Doctor/DoctorAdmin.jsx";
import DoctorLayout from "./Doctor/DoctorLayout.jsx";
import DoctorRoute from "./Doctor/DoctorRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route
          path=""
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />
        <Route
          path="Doctors"
          element={
            <UserRoute>
              <Doctors />
            </UserRoute>
          }
        />
        <Route
          path="About"
          element={
            <UserRoute>
              <About />
            </UserRoute>
          }
        />
        <Route
          path="Contact"
          element={
            <UserRoute>
              <Contact />
            </UserRoute>
          }
        />
        <Route
          path="/doctors/:id"
          element={
            <UserRoute>
              <DoctorProfile />
            </UserRoute>
          }
        />

        <Route
          path="Register"
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="Register/LoginPage"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="Profile"
          element={
            <ProtectedRoute requireAuth={true}>
              <UserRoute>
                <PatientProfile />
              </UserRoute>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/AdminHome"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminHome />} />
      </Route>

      <Route
        path="/DoctorAdmin"
        element={
          <DoctorRoute>
            <DoctorLayout />
          </DoctorRoute>
        }
      >
        <Route index element={<DoctorAdmin />}></Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
