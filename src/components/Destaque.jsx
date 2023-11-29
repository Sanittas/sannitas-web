import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/destaque.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Destaque() {
    const [dailyServiceData, setDailyServiceData] = useState([]);
    const [dailyRevenue, setDailyRevenue] = useState([]);
    //const idEmpresa = sessionStorage.getItem("idEmpresa");
    const idEmpresa = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceResponse = await axios.get(`http://localhost:3001/data/daily-service/${idEmpresa}`);
                setDailyServiceData(serviceResponse.data);
                const revenueResponse = await axios.get(`http://localhost:3001/data/daily-revenue/${idEmpresa}`);
                setDailyRevenue(revenueResponse.data);
            } catch (error) {
                console.error('error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    function getRandomColor() {
        const shadesOfBlue = ["#5465e2", "#949bf3", "#8bc1da", "#0c88bc", "#042474"];
        const randomIndex = Math.floor(Math.random() * shadesOfBlue.length);
        const color = shadesOfBlue[randomIndex];

        return {
            backgroundColor: color,
            borderColor: color,
        };
    }

    const data = {
        labels: dailyServiceData.map(entry => entry.servico),
        datasets: [
            {
                label: "Atendimentos",
                data: dailyServiceData.map(entry => entry.quantidade_atendimentos),
                backgroundColor: dailyServiceData.map(() => getRandomColor().backgroundColor),
                borderColor: dailyServiceData.map(() => getRandomColor().borderColor),
                borderWidth: 1,
                hoverBackgroundColor: ["#36A2EB"],
            },
        ],
    };

    const options = {

    };

    return (
        <div className="destaque">
            <div className="top">
                <h1 className="title"> Números de hoje</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="destaqueChart">
                    <Bar
                        data={data}
                        options={options}
                    ></Bar>
                </div>
                <p className="titleDestaque">Receita</p>
                <p className="amount">R$ {dailyRevenue.length > 0 ? dailyRevenue[0].receita_do_dia : 0}</p>
                <p className="desc">
                    Os últimos pagamentos podem não estar incluídos.
                </p>
            </div>
        </div>
    );
}

export default Destaque;