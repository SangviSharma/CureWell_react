import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateSurgeryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    surgeryId: "",
    doctorId: "",
    date: "",
    category: "",
    startTime: "",
    endTime: "",
  });

  const [touched, setTouched] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/surgeries/${id}`)
      .then((res) => {
        const s = res.data;

        setForm({
          surgeryId: s.id,
          doctorId: s.doctorId,
          
          date: s.date ? s.date.split("T")[0] : "",

          category: s.category,

          startTime: s.startTime?.slice(0, 5) || "",
          endTime: s.endTime?.slice(0, 5) || "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

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
      startTime: true,
      endTime: true,
    });

    if (!form.startTime || !form.endTime || isTimeInvalid) return;

    axios
      .put(`http://localhost:5000/api/surgeries/${id}`, {
        startTime: form.startTime,
        endTime: form.endTime,
      })
      .then(() => {
        alert("Surgery updated successfully!");
        navigate("/view-surgeries");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="shadow rounded p-4" style={{ width: "400px", backgroundColor: "#192126" }}>
          
          <h3 className="text-center text-white mb-4">
            Update Surgery
          </h3>

          <label className="text-white">Surgery ID</label>
          <input className="form-control mb-3" value={form.surgeryId} disabled />

          <label className="text-white">Doctor ID</label>
          <input className="form-control mb-3" value={form.doctorId} disabled />

          <label className="text-white">Date</label>
          <input type="date" className="form-control mb-3" value={form.date} disabled />

          <label className="text-white">Start Time</label>
          <input
            type="time"
            name="startTime"
            className={`form-control mb-3 ${
              isError("startTime") || isTimeInvalid ? "is-invalid" : ""
            }`}
            value={form.startTime}
            onChange={handleChange}
            onBlur={() => handleBlur("startTime")}
          />

          <label className="text-white">End Time</label>
          <input
            type="time"
            name="endTime"
            className={`form-control mb-3 ${
              isError("endTime") || isTimeInvalid ? "is-invalid" : ""
            }`}
            value={form.endTime}
            onChange={handleChange}
            onBlur={() => handleBlur("endTime")}
          />

          {isTimeInvalid && (
            <div className="text-warning mb-2">
              Start time must be before end time
            </div>
          )}

          <label className="text-white">Category</label>
          <input className="form-control mb-3" value={form.category} disabled />

          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Update
          </button>

        </div>
      </div>
    </>
  );
};

export default UpdateSurgeryPage;