import "../css/dashboard.css";
import api8081 from "../api/apiToken";
import React, { useState, useEffect } from "react";
import Navbar from "../components/NavbarDash";
import Widget from "../components/Widgets";
import Destaque from "../components/Destaque";
import Chart from "../components/Chart";

function Dashboard() {
    return (
        <div className="dashboard">
            Dashboard
            <Navbar />
            <div className="dashContainer">
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="popular" />
                    <Widget type="satisfaction" />
                    <Widget type="total" />
                </div>
                <div className="charts">
                    <Destaque />
                    <Chart />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
