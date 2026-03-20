import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

const ViewDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = () => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    axios
      .delete(`http://localhost:5000/api/doctors/${id}`)
      .then(() => {
        alert("Deleted successfully!");
        fetchDoctors(); 
      })
      .catch((err) => {
        console.log(err);
        alert("Delete failed");
      });
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-bold">
          View Doctors
        </h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">

            <thead>
              <tr>
                <th style={{ backgroundColor: "#192126", color: "white" }}>
                  Doctor ID
                </th>
                <th style={{ backgroundColor: "#192126", color: "white" }}>
                  Name
                </th>
                <th style={{ backgroundColor: "#192126", color: "white" }}>
                  Specialization
                </th>
                <th style={{ backgroundColor: "#192126", color: "white" }}>
                  Availability
                </th>
                <th style={{ backgroundColor: "#192126", color: "white" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr
                  key={doc.id || doc._id}
                  className={
                    doc.availability === "Available"
                      ? "table-success"
                      : "table-danger"
                  }
                >
                  <td className="fw-semibold">{doc.id || doc._id}</td>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.availability}</td>

     
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2 px-3"
                      onClick={() =>
                        navigate(`/update-doctor/${doc.id || doc._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(doc.id || doc._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
};

export default ViewDoctorsPage;