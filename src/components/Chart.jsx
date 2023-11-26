import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/chart.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Chart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/chart-data');
                setChartData(response.data);
            } catch (error) {
                console.error('error fetching chart data:', error);
            }
        };
        fetchData();
    }, []);

    const serviceLabels = Array.from(new Set(chartData.map(entry => entry.descricao)));
    const monthLabels = Array.from(new Set(chartData.map(entry => entry.mes))).sort((a, b) => a - b);

    const datasets = serviceLabels.map((serviceLabel, index) => {
        const color = getRandomColor();
        const dataPoints = monthLabels.map((month) => {
            const entry = chartData.find(item => item.descricao === serviceLabel && item.mes === month);
            return entry ? entry.receita : 0;
        });

        return {
            label: serviceLabel,
            data: dataPoints,
            fill: false,
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
            tension: 0.4,
        };
    });

    const data = {
        labels: monthLabels.map(month => getMonthName(month)),
        datasets: datasets,
    };

    const options = {
        plugins: {
            legend: true,
        },
        scales: {
            y: {
                min: 0,
                max: Math.max(...datasets.flatMap(dataset => dataset.data)) + 1000,
            }
        }
    };

    function getMonthName(month) {
        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        return monthNames[month - 1];
    }

    function getRandomColor() {
        const shadesOfBlue = ["#5465e2", "#949bf3", "#8bc1da", "#0c88bc", "#042474"];
        const randomIndex = Math.floor(Math.random() * shadesOfBlue.length);
        const color = shadesOfBlue[randomIndex];
        
        return {
            backgroundColor: color,
            borderColor: color
        };
    }
    

    return (
        <div className="destaque">
            <div className="top">
                <h1 className="title"> Receita por serviço dos últimos 6 meses</h1>
            </div>
            <div className="chart">
                <Line
                    data={data}
                    options={options}
                ></Line>
            </div>
        </div>
    );
}

export default Chart;   