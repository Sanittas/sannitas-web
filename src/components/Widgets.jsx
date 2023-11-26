import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/widgets.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';

function Widget({ type }) {
    var data = {};
    const [users, setUsers] = useState([]);
    const [csat, setCsat] = useState([]);
    const [popService, setPopService] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);
    const [usersDiff, setUsersDiff] = useState([]);
    const [csatDiff, setCsatDiff] = useState([]);
    const [totalRevenueDiff, setTotalRevenueDiff] = useState([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/num-users');
                setUsers(response.data[0].total_users);
                setUsersDiff(response.data[0].current_users);
            } catch (error) {
                console.error('error fetching users data:', error);
            }
        };
        fetchUsersData();
    }, []);
    useEffect(() => {
        const fetchCsatData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/csat');
                setCsat(response.data[0].csat_percentage);
                setCsatDiff(response.data[0].csat_percentage_current_month);
            } catch (error) {
                console.error('error fetching csat data:', error);
            }
        };
        fetchCsatData();
    }, []);
    useEffect(() => {
        const fetchPopServiceData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/popular-service');
                setPopService(response.data[0].nome_servico);
            } catch (error) {
                console.error('error fetching popular service data:', error);
            }
        };
        fetchPopServiceData();
    }, []);
    useEffect(() => {
        const fetchPopServiceData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/total-revenue');
                setTotalRevenue(prevTotalRevenue => {
                    const current_month = response.data[0].revenue_current_month;
                    const diff = (((100 * current_month) / (prevTotalRevenue - current_month) - 100).toFixed(1));
                    setTotalRevenueDiff(diff);
                    return response.data[0].revenue_total;
                });
            } catch (error) {
                console.error('error fetching total revenue data:', error);
            }
        };
        fetchPopServiceData();
    }, []);

    switch (type) {
        case "user":
            data = {
                title: "N° USUÁRIOS",
                isMoney: false,
                isPercentage: false,
                amount: users,
                diff: usersDiff,
                link: "Ver todos",
                icon: <PersonOutlinedIcon className="icon" style={{
                    color: "#fff",
                    backgroundColor: "#909CFF"
                }} />,
            };
            break;
        case "popular":
            data = {
                title: "SERVIÇO MAIS POPULAR",
                isMoney: false,
                isPercentage: false,
                isService: true,
                amount: popService,
                link: "Ver todos",
                icon: <HomeRepairServiceOutlinedIcon className="icon" style={{
                    color: "#fff",
                    backgroundColor: "#909CFF"
                }} />,
            };
            break;
        case "satisfaction":
            data = {
                title: "SATISFAÇÃO DO USUÁRIO   ",
                isMoney: false,
                isPercentage: true,
                amount: csat,
                diff: csatDiff,
                link: "Ver avaliações",
                icon: <ThumbUpOffAltIcon className="icon" style={{
                    color: "#fff",
                    backgroundColor: "#909CFF"
                }} />,
            };
            break;
        case "total":
            data = {
                title: "RECEITA TOTAL",
                isMoney: true,
                isPercentage: true,
                amount: totalRevenue,
                diff: totalRevenueDiff,
                link: "Ver detalhes",
                icon: <AccountBalanceWalletOutlinedIcon className="icon" style={{
                    color: "#fff",
                    backgroundColor: "#909CFF"
                }} />,
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
                    {data.isMoney && "R$"} {data.amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${data.diff >= 0 ? "positive" : "negative"}`}>
                    {data.isService ? null : <KeyboardArrowUpIcon />}
                    {data.diff} {data.isPercentage ? "%" : " "}
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
