import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#192126" }}
    >
      <div className="container-fluid">
        
        <Link className="navbar-brand fw-bold" to="/">
          CureWell
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/doctors">
                View Doctors
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/specializations">
                Specializations
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/schedule-surgery">
                Schedule Surgery
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/surgeries">
                Today's Surgeries
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
 

  <button className="btn btn-light btn-sm px-4"
  onClick={() => navigate("/add-doctor")}>

    + Add Doctor
  </button>

</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;