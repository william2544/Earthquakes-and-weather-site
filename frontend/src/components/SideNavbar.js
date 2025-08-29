import React from "react";
import '../components/styles/SideNavbar.css'

function SideNavbar() {
    return(
        <div className="sidenav">
            <div style={{padding: "10px", fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
                Weather & Earthquake Alerts
            </div>
            <div>
                <a href="/">Dashbord</a>
                <a href="/earthquakes">Earthquakes</a>
                <a href="/weather">Weather</a>
            </div>
            
            <a className="about" href="/about">About</a>
        </div>
    )
}

export default SideNavbar;