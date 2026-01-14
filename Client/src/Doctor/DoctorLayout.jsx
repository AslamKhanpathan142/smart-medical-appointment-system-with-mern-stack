import { Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Outlet /> 
    </div>
  );
}
