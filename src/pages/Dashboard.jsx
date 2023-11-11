import "../css/dashboard.css";
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
                    <Widget type="satisfaction" />
                    <Widget type="popular" />
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
