import React from "react";

const Header = () => {
  return (
    <div
      style={{
        height: "600px",
        background: "linear-gradient(rgba(92, 97, 101, 0.8), rgba(92, 97, 101, 0.8)), url('https://imgcdn.stablediffusionweb.com/2024/6/1/5745d4b0-b2b6-4ff5-a74b-31bd63a4ed74.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <div>
        <h1 className="fw-bold mb-3">
      CureWell Hospital Management System
    </h1>

    <p
  className="fs-5 text-center"
  style={{
    maxWidth: "750px",
    margin: "0 auto",
    lineHeight: "1.6",
  }}
>
  Our Hospital Management System is designed to streamline healthcare
  operations by efficiently managing doctors, specializations, and surgery
  schedules, ensuring smooth coordination and high-quality patient care.
</p>
      </div>
    </div>
  );
};

export default Header;