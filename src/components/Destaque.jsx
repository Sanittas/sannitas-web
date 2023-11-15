import "../css/destaque.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Destaque() {
    const data = {
        labels: ["Enfermeiros", "Dentistas", "Fisioterapeutas", "Obstetras", "Médicos"],
        datasets: [
            {
                label: "Atendimentos",
                data: [20, 10, 15, 3, 23],
                backgroundColor: ["#5465e2", "#949bf3", "#8bc1da", "#0c88bc", "#042474"],
                borderColor: ["#5465e2", "#949bf3", "#8bc1da", "#0c88bc", "#042474"],
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
                <p className="amount">R$ 3320</p>
                <p className="desc">
                    Os últimos pagamentos podem não estar incluídos.
                </p>
            </div>
        </div>
    );
}

export default Destaque;