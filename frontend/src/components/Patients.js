import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PatientCard from "./PatientCard";
import "../stylesheets/Patients.css";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/patients/add", newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
        setNewPatient({ name: "", age: "", gender: "" });
      })
      .catch((error) => console.error("Error Adding Patient: ", error));
  };

  const handleUpdatePatient = (id, e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/patients/update/${id}`, selectedPatient)
      .then((response) => {
        const updatePat = {
          ...selectedPatient,
          _id: id,
        };

        setPatients(
          patients.map((patient) => (patient._id === id ? updatePat : patient))
        );

        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating patient: ", error));
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(`http://localhost:8000/patients/delete/${id}`)
      .then((response) => {
        setSelectedPatient(null);
        setPatients(patients.filter((patient) => patient._id !== id));
      })
      .catch((error) => console.error("Error Deleting Patient: ", error));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className="patient-main">
      <div className="form-sections">
        <h4>{isEditMode ? "Edit Patient" : "Add New Patient"}</h4>
        <form
          onSubmit={
            isEditMode
              ? (e) => handleUpdatePatient(selectedPatient._id, e)
              : (e) => handleAddPatient(e)
          }
        >
          <label>Name: </label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.name : newPatient.name}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({
                    ...selectedPatient,
                    name: e.target.value,
                  })
                : setNewPatient({
                    ...newPatient,
                    name: e.target.value,
                  })
            }
          />
          <br />
          <label>Gender: </label>
          <input
            type="text"
            value={isEditMode ? selectedPatient.gender : newPatient.gender}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({
                    ...selectedPatient,
                    gender: e.target.value,
                  })
                : setNewPatient({
                    ...newPatient,
                    gender: e.target.value,
                  })
            }
          />
          <br />
          <button type="submit">
            {isEditMode ? "Update Patient" : "Add Patient"}
          </button>
        </form>
      </div>

      <div className="patients-section">
        <h3 style={{ textAlign: "center" }}>Patients ({patients.length})</h3>

        <div className="patient-list">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
