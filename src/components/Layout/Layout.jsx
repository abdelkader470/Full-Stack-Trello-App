import React from "react";
import "./Layout.style.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Background from "../../images/background.jpg";
import bg from "../../images/bg.jpg";

function Layout() {
  return (
    <div>
      <div
        className="container-fluid vh-100"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="row">
          <div
            className="w-75 m-auto mt-5"
            style={{ backdropFilter: `blur(4px)` }}
          >
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
