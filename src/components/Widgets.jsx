import React from "react";
import "../css/widget.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';

function Widget({ type }) {
    var data = {};
    const amount = 100;
    let diff = -10;

    switch (type) {
        case "user":
            data = {
                title: "N° USUÁRIOS",
                isMoney: false,
                link: "Ver todos",
                icon: <PersonOutlinedIcon className="icon" style={{
                    color: "#fff",
                    backgroundColor: "#909CFF"
                }} />,
            };
            break;
        case "satisfaction":
            data = {
                title: "SATISFAÇÃO DO USUÁRIO   ",
                isMoney: false,
                link: "Ver avaliações",
                icon: <ThumbUpOffAltIcon className="icon" />,
            };
            break;
        case "popular":
            data = {
                title: "SERVIÇO MAIS POPULAR",
                isMoney: false,
                link: "Ver todos",
                icon: <HomeRepairServiceOutlinedIcon className="icon" />,
            };
            break;
        case "total":
            data = {
                title: "RECEITA TOTAL",
                isMoney: true,
                link: "Ver detalhes",
                icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
                    <KeyboardArrowUpIcon />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
