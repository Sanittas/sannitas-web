import React from "react";
import "../css/dashboard.css";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Widget from "../components/Widgets";
import Destaque from "../components/Destaque";
import Chart from "../components/Chart";

function Dashboard() {
    return (
        <div className="dashboard">
            Dashboard
            <NavbarPosLogin />
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
