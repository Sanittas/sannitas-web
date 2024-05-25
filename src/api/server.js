const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '--senha_do_banco_de_dados--',
    database: '--nome_do_banco_de_dados--',
});
db.connect();

app.get('/data/num-users/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `
    SELECT
    COUNT(DISTINCT CASE WHEN MONTH(data_agendamento) = MONTH(CURRENT_DATE()) THEN fk_usuario END) AS current_users,
    COUNT(DISTINCT fk_usuario) AS total_users
    FROM agendamento_servico
    WHERE fk_servico IN (SELECT id_servico FROM servico WHERE fk_empresa = ?);`;
    db.query(query, [idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/csat/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `SELECT
    COUNT(*) AS total_evaluations,
    SUM(CASE WHEN avaliacao >= 4 THEN 1 ELSE 0 END) AS positive_evaluations,
    ROUND((SUM(CASE WHEN avaliacao >= 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) AS csat_percentage,
    (SELECT COUNT(*)
     FROM avaliacao a
     JOIN agendamento_servico ag ON a.fk_agendamento = ag.id_agendamento
     JOIN servico s ON ag.fk_servico = s.id_servico
     WHERE s.fk_empresa = ?
     AND MONTH(ag.data_agendamento) = MONTH(CURRENT_DATE())) AS total_evaluations_current_month,
    (SELECT SUM(CASE WHEN a.avaliacao >= 4 THEN 1 ELSE 0 END)
     FROM avaliacao a
     JOIN agendamento_servico ag ON a.fk_agendamento = ag.id_agendamento
     JOIN servico s ON ag.fk_servico = s.id_servico
     WHERE s.fk_empresa = ?
     AND MONTH(ag.data_agendamento) = MONTH(CURRENT_DATE())) AS positive_evaluations_current_month,
    (SELECT ROUND((SUM(CASE WHEN a.avaliacao >= 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1)
     FROM avaliacao a
     JOIN agendamento_servico ag ON a.fk_agendamento = ag.id_agendamento
     JOIN servico s ON ag.fk_servico = s.id_servico
     WHERE s.fk_empresa = ?
     AND MONTH(ag.data_agendamento) = MONTH(CURRENT_DATE())) AS csat_percentage_current_month
FROM avaliacao a
JOIN agendamento_servico ag ON a.fk_agendamento = ag.id_agendamento
JOIN servico s ON ag.fk_servico = s.id_servico
WHERE s.fk_empresa = ?;`;
    db.query(query, [idEmpresa, idEmpresa, idEmpresa, idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/popular-service/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `SELECT s.descricao AS nome_servico, COUNT(*) AS quantidade_agendamentos
    FROM agendamento_servico ag
    JOIN servico s ON ag.fk_servico = s.id_servico
    WHERE s.fk_empresa = ?
    GROUP BY s.descricao
    ORDER BY quantidade_agendamentos DESC
    LIMIT 1;`;
    db.query(query, [idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/total-revenue/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `SELECT
    COALESCE(
        (SELECT SUM(s.valor) AS receita_total
        FROM agendamento_servico ag
        JOIN servico s ON ag.fk_servico = s.id_servico
        JOIN pagamento p ON ag.fk_pagamento = p.id_pagamento
        WHERE s.fk_empresa = ?
        AND MONTH(ag.data_agendamento) = MONTH(CURRENT_DATE()) - 1),
        0
    ) AS revenue_last_month,
    (SELECT SUM(s.valor) AS receita_total
    FROM agendamento_servico ag
    JOIN servico s ON ag.fk_servico = s.id_servico
    JOIN pagamento p ON ag.fk_pagamento = p.id_pagamento
    WHERE s.fk_empresa = ?
    AND MONTH(ag.data_agendamento) = MONTH(CURRENT_DATE())) AS revenue_current_month,
    (SELECT SUM(s.valor) AS receita_total
    FROM agendamento_servico ag
    JOIN servico s ON ag.fk_servico = s.id_servico
    JOIN pagamento p ON ag.fk_pagamento = p.id_pagamento
    WHERE s.fk_empresa = ?) AS revenue_total;`;
    db.query(query, [idEmpresa, idEmpresa, idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/daily-service/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `SELECT s.descricao AS servico, COUNT(*) AS quantidade_atendimentos
    FROM agendamento_servico ag
    JOIN servico s ON ag.fk_servico = s.id_servico
    WHERE DATE(ag.data_agendamento) = CURRENT_DATE() AND s.fk_empresa = ?
    GROUP BY s.descricao;`;
    db.query(query, [idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/daily-revenue/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `SELECT SUM(s.valor) AS receita_do_dia
    FROM agendamento_servico ag
    JOIN servico s ON ag.fk_servico = s.id_servico
    JOIN pagamento p ON ag.fk_pagamento = p.id_pagamento
    WHERE DATE(ag.data_agendamento) = CURRENT_DATE() AND s.fk_empresa = ?;`;
    db.query(query, [idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/chart-data/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `SELECT
    s.id_servico,
    s.descricao,
    MONTH(ag.data_agendamento) AS mes,
    YEAR(ag.data_agendamento) AS ano,
    SUM(s.valor) AS receita
    FROM servico s
    JOIN agendamento_servico ag ON s.id_servico = ag.fk_servico
    JOIN pagamento p ON ag.fk_pagamento = p.id_pagamento
    WHERE ag.data_agendamento >= CURDATE() - INTERVAL 6 MONTH AND s.fk_empresa = ?
    GROUP BY s.id_servico, s.descricao, YEAR(ag.data_agendamento), MONTH(ag.data_agendamento)
    ORDER BY ano DESC, mes DESC, receita DESC;`;
    db.query(query, [idEmpresa], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
