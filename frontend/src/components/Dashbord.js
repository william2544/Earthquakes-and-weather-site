import React from "react";
import "../components/styles/Dashbord.css";
import InformDiv from "./InformDiv";
import Map from "./Map";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-body">
        {/* Other dashboard widgets/content */}
        <InformDiv/>
        <Map/>
      </div>
    </div>
  );
}

export default Dashboard;
