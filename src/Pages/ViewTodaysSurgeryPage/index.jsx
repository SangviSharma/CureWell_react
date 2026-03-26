import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

const ViewTodaySurgeryPage = () => {
  const navigate = useNavigate();

  const [surgeries, setSurgeries] = useState([]);

 useEffect(() => {
  axios.get("http://localhost:5000/api/surgeries/today")
    .then((res) => {
      console.log("API DATA:", res.data);
      setSurgeries(res.data); 
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "1000px" }}>
        <h3 className="text-center mb-4 fw-bold">
          View Today's Surgery
        </h3>

        <div className="shadow rounded overflow-hidden">
          <div className="bg-white p-3">
            <table className="table table-bordered table-hover text-center align-middle">

              <thead>
                <tr>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>Surgery ID</th>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>Doctor ID</th>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>Date</th>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>Start Time</th>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>End Time</th>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>Category</th>
                  <th style={{ backgroundColor: "#192126", color: "white" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {surgeries.length > 0 ? (
                  surgeries.map((surgery) => (
                    <tr key={surgery.id}>
                      <td className="fw-semibold">{surgery.id}</td>
                      <td>{surgery.doctorId}</td>
                      <td>{surgery.date}</td>
                      <td>{surgery.startTime}</td>
                      <td>{surgery.endTime}</td>
                      <td>{surgery.category}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm px-3"
                          onClick={() =>
                            navigate(`/update-surgery/${surgery.id}`)
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No surgeries found</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTodaySurgeryPage;