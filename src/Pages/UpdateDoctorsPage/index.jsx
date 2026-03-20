import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateDoctorsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => {
        const doc = res.data;
        setName(doc.name);
        setSpecialization(doc.specialization);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    if (!name.trim() || !specialization.trim()) {
      setError("All fields are required");
      return;
    }

    axios
      .put(`http://localhost:5000/api/doctors/${id}`, {
        name,
        specialization,
      })
      .then(() => {
        alert("Doctor updated successfully!");
        navigate("/view-doctors");
      })
      .catch((err) => {
        console.log(err);
        setError("Update failed");
      });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-5 text-white">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div
          className="p-4 shadow"
          style={{
            width: "400px",
            borderRadius: "10px",
            backgroundColor: "#192126",
          }}
        >
          <h3 className="text-center mb-3 text-white">
            Update Doctor
          </h3>

          <p className="text-center mb-3 text-white">
            All fields are mandatory.
          </p>

          <div className="mb-3">
            <label className="form-label text-white">
              Doctor ID
            </label>
            <input
              type="text"
              className="form-control"
              value={id}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">
              Doctor's Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">
              Specialization
            </label>
            <input
              type="text"
              className="form-control"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && <small className="text-danger">{error}</small>}

          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary px-4" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDoctorsPage;