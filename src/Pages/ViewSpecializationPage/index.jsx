import React from "react";
import Navbar from "../../Components/Navbar";

const ViewSpecializationPage = () => {
  const specializations = [
    { code: "ANE", name: "Anesthesiologist" },
    { code: "CAR", name: "Cardiologist" },
    { code: "GYN", name: "Gynecologist" },
    { code: "ORT", name: "Orthopedic" },
    { code: "DER", name: "Dermatologist" },
    { code: "PED", name: "Pediatrician" },
    { code: "NEU", name: "Neurologist" },
    { code: "PSY", name: "Psychiatrist" },
    { code: "RAD", name: "Radiologist" },
    { code: "ONC", name: "Oncologist" },
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "850px" }}>
        
        <h3 className="text-center mb-4 fw-bold">
          View Specializations
        </h3>

        <div className="shadow rounded overflow-hidden">
          
          <div className="bg-white p-3">
            <table className="table table-bordered table-hover text-center align-middle">
              
               <thead>
               <tr>
                <th style={{ backgroundColor: "#192126", color: "white" }}>Specialization Code</th>
                <th style={{ backgroundColor: "#192126", color: "white" }}>Specialization Name</th>
        
               </tr>
              </thead>
              <tbody>
                {specializations.map((spec, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{spec.code}</td>
                    <td>{spec.name}</td>
                    
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default ViewSpecializationPage;