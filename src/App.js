import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import ViewDoctors from "./Pages/ViewDoctorsPage";
import AddDoctor from "./Pages/AddDoctorPage";
import ViewSpecialization from "./Pages/ViewSpecializationPage";
import ViewTodaySurgery from "./Pages/ViewTodaysSurgeryPage";
import UpdateSurgery from "./Pages/UpdateSurgeryPage";
import UpdateDoctorsPage from "./Pages/UpdateDoctorsPage";
import ScheduleSurgery from "./Pages/ScheduleSurgeryPage";


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />    
        <Route path="/doctors" element={<ViewDoctors />} />
        <Route path="/update-doctor/:id" element={<UpdateDoctorsPage />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/schedule-surgery" element={<ScheduleSurgery />} />
        <Route path="/specializations" element={<ViewSpecialization />} />
        <Route path="/surgeries" element={<ViewTodaySurgery />} />
        <Route path="/update-surgery/:id" element={<UpdateSurgery />} />
      </Routes>
    </Router>
  );
}

export default App;