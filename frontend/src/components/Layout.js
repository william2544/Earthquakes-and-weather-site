import React from "react";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";
import '../components/styles/Layout.css'

function Layout(){
    return(
        <div className="layout">
            <SideNavbar/>
            <div className="main">
                <Outlet/>
            </div>
        </div>
    )
}
export default Layout;