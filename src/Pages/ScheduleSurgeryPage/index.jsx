import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";

const ScheduleSurgeryPage = () => {
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    category: "",
    startTime: "",
    endTime: "",
  });

  const [doctors, setDoctors] = useState([]); 
  const [touched, setTouched] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const isError = (field) =>
    touched[field] && !form[field];

  const isTimeInvalid =
    form.startTime &&
    form.endTime &&
    form.startTime >= form.endTime;

  const handleSubmit = () => {
    setTouched({
      doctorId: true,
      date: true,
      category: true,
      startTime: true,
      endTime: true,
    });

    if (
      !form.doctorId ||
      !form.date ||
      !form.category ||
      !form.startTime ||
      !form.endTime ||
      isTimeInvalid
    ) return;

    axios.post("http://localhost:5000/api/surgeries", {
      doctorId: form.doctorId,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      category: form.category,
})
      .then(() => {
        alert("Surgery scheduled successfully!");

        setForm({
          doctorId: "",
          date: "",
          category: "",
          startTime: "",
          endTime: "",
        });
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          alert(err.response.data.message); 
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <>
      <Navbar />
      <br />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh", backgroundColor: "#f4f7fb" }}
      >
        <div
          className="shadow rounded"
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "#192126",
            padding: "30px 25px",
            borderRadius: "12px",
          }}
        >
          <h3 className="text-center text-white fw-bold mb-4">
            Schedule Surgery
          </h3>

          <div className="mb-4">
            <label className="text-white">Doctor</label>
            <select
              name="doctorId"
              className={`form-control ${
                isError("doctorId") ? "is-invalid" : ""
              }`}
              value={form.doctorId}
              onChange={handleChange}
              onBlur={() => handleBlur("doctorId")}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.specialization})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-white">Date</label>
            <input
              type="date"
              name="date"
              className={`form-control ${
                isError("date") ? "is-invalid" : ""
              }`}
              value={form.date}
              onChange={handleChange}
              onBlur={() => handleBlur("date")}
            />
          </div>

          <div className="mb-4">
            <label className="text-white">Start Time</label>
            <input
              type="time"
              name="startTime"
              className={`form-control ${
                isError("startTime") || isTimeInvalid
                  ? "is-invalid"
                  : ""
              }`}
              value={form.startTime}
              onChange={handleChange}
              onBlur={() => handleBlur("startTime")}
            />
          </div>

          <div className="mb-4">
            <label className="text-white">End Time</label>
            <input
              type="time"
              name="endTime"
              className={`form-control ${
                isError("endTime") || isTimeInvalid
                  ? "is-invalid"
                  : ""
              }`}
              value={form.endTime}
              onChange={handleChange}
              onBlur={() => handleBlur("endTime")}
            />
          </div>

          {isTimeInvalid && (
            <div className="text-warning small mb-3">
              Start time must be less than End time
            </div>
          )}

          <div className="mb-4">
            <label className="text-white">Category</label>
            <input
              type="text"
              name="category"
              className={`form-control ${
                isError("category") ? "is-invalid" : ""
              }`}
              value={form.category}
              onChange={handleChange}
              onBlur={() => handleBlur("category")}
              placeholder="e.g. CAR, ORT, ANE"
            />
          </div>

          <div className="text-center mt-3">
            <button
              className="btn btn-primary px-4"
              onClick={handleSubmit}
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleSurgeryPage;