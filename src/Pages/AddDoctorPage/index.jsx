import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";

const AddDoctorPage = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    availability: "Available",
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const isError = (field) =>
    touched[field] && !form[field].trim();

  const handleSubmit = async () => {
    setTouched({
      name: true,
      specialization: true,
    });

    if (!form.name.trim() || !form.specialization.trim()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/doctors", form);
      alert("Doctor added successfully!");

      setForm({
        name: "",
        specialization: "",
        availability: "Available",
      });

    } catch (err) {
      console.log(err);
      alert("Error adding doctor");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div
          className="p-4 shadow"
          style={{ width: "400px", borderRadius: "10px", backgroundColor: "#192126" }}
        >
          <h3 className="text-center fw-bold mb-2" style={{ color: "white" }}>
            Add Doctor
          </h3>

          <p className="text-center text-small mb-4" style={{ color: "white" }}>
            All fields are mandatory.
          </p>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "white" }}>
              Doctor's Name
            </label>
            <input
              type="text"
              name="name"
              className={`form-control ${isError("name") ? "is-invalid" : ""}`}
              placeholder="Enter doctor's name"
              value={form.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
            />
            {isError("name") && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "white" }}>
              Doctor's Specialization
            </label>
            <input
              type="text"
              name="specialization"
              className={`form-control ${
                isError("specialization") ? "is-invalid" : ""
              }`}
              placeholder="Enter doctor's specialization"
              value={form.specialization}
              onChange={handleChange}
              onBlur={() => handleBlur("specialization")}
            />
            {isError("specialization") && (
              <div className="invalid-feedback">
                Specialization is required
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "white" }}>
              Availability
            </label>
            <select
              name="availability"
              className="form-select"
              value={form.availability}
              onChange={handleChange}
            >
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-primary px-4" onClick={handleSubmit}>
              + Add Doctor
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoctorPage;