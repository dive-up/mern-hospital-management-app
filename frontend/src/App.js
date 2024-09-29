import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Appointments from "./components/Appointments";
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import "./stylesheets/App.css";

function App() {
  const isLinkActive = (path) => window.location.pathname === path;

  return (
    <BrowserRouter>
      <div className="container">
        <h1 style={{ color: "green" }}>GFG - Hospital Management App</h1>
        <nav>
          <ul>
            <li className={isLinkActive("/appointments") ? "active" : ""}>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li className={isLinkActive("/doctors") ? "active" : ""}>
              <Link to="/doctors">Doctors</Link>
            </li>
            <li className={isLinkActive("/patients") ? "active" : ""}>
              <Link to="/patients">Patients</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
