import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import useAuthStore from "./zustand/AuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import ViewTreatmentRecord from "./pages/ViewTreatmentRecord";
import NotFound from "./pages/NotFound";
import OTP from "./components/OTP";
import Doctors from "./pages/Doctors";
import ClientAppointmentList from "./pages/ClientAppointmentList";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="overflow-x-hidden">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/client-appointments"
          element={user ? <ClientAppointmentList /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/patients"
          element={user ? <Patient /> : <Navigate to="/" />}
        />
        <Route
          path="/doctors"
          element={user ? <Doctors /> : <Navigate to="/" />}
        />
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:id"
          element={user ? <ViewTreatmentRecord /> : <Navigate to="/" />}
        />
        <Route path="/otp" element={<OTP />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
