import "../css/chart.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

function Chart() {
    const data = {
        labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'],
        datasets: [
            {
                label: 'Enfermeiros',
                data: [2000, 29000, 15000, 30000, 23000, 10000],
                fill: false,
                backgroundColor: '#5465e2',
                borderColor: '#5465e2',
                tension: 0.4
            },
            {
                label: 'Dentistas',
                data: [10000, 20000, 50000, 15000, 13000, 22000],
                fill: false,
                backgroundColor: '#949bf3',
                borderColor: '#949bf3',
                tension: 0.4
            },
            {
                label: 'Fisioterapeutas',
                data: [15000, 50000, 20000, 10000, 22000, 30000],
                fill: false,
                backgroundColor: '#8bc1da',
                borderColor: '#8bc1da',
                tension: 0.4
            },
            {
                label: 'Obstetras',
                data: [30000, 15000, 10000, 20000, 50000, 15000],
                fill: false,
                backgroundColor: '#0c88bc',
                borderColor: '#0c88bc',
                tension: 0.4
            },
            {
                label: 'Médicos',
                data: [56000, 13300, 70000, 90000, 71000, 58000],
                fill: false,
                backgroundColor: '#042474',
                borderColor: '#042474',
                tension: 0.4
            },
        ],
    }

    const options = {
        plugins: {
            legend: true,
        },
        scales: {
            y: {
                min: 1000,
                max: 100000
            }
        }
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