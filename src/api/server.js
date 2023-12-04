const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'paulo1421',
    database: 'sanittas',
});
db.connect();

app.get('/data/num-users/:idEmpresa', (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    const query = `
    SELECT
    COUNT(DISTINCT CASE WHEN MONTH(data_agendamento) = MONTH(CURRENT_DATE()) THEN fk_usuario END) AS current_users,
    COUNT(DISTINCT fk_usuario) AS total_users
FROM sanittas.agendamento_servico
WHERE fk_servico_empresa = ?;`;
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
    SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END) AS positive_evaluations,
    ROUND((SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) AS csat_percentage,
    (SELECT COUNT(*)
     FROM sanittas.agendamento_servico
     WHERE fk_servico_empresa = ?
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS total_evaluations_current_month,
    (SELECT SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END)
     FROM sanittas.agendamento_servico
     WHERE fk_servico_empresa = ?
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS positive_evaluations_current_month,
    (SELECT ROUND((SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1)
     FROM sanittas.agendamento_servico
     WHERE fk_servico_empresa = ?
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS csat_percentage_current_month
FROM sanittas.agendamento_servico
WHERE fk_servico_empresa = ?;`;
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
    FROM sanittas.agendamento_servico asv
    JOIN sanittas.servico s ON asv.fk_servico_empresa = s.idservico
    JOIN sanittas.servico_empresa se ON asv.fk_servico_empresa = se.fk_empresa
    WHERE se.fk_empresa = ?
    GROUP BY asv.fk_servico_empresa, s.descricao
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
        (SELECT SUM(se.valor_servico) AS receita_total
        FROM sanittas.agendamento_servico a
        JOIN sanittas.servico_empresa se ON a.fk_servico_empresa = se.id AND a.fk_servico_empresa = se.fk_empresa
        JOIN sanittas.pagamento p ON a.fk_pagamento = p.idpagamento
        WHERE se.fk_empresa = ?
        AND MONTH(a.data_agendamento) = MONTH(CURRENT_DATE()) - 1),
        0
    ) AS revenue_last_month,
        (SELECT SUM(se.valor_servico) AS receita_total
        FROM sanittas.agendamento_servico a
        JOIN sanittas.servico_empresa se ON a.fk_servico_empresa = se.id AND a.fk_servico_empresa = se.fk_empresa
        JOIN sanittas.pagamento p ON a.fk_pagamento = p.idpagamento
        WHERE se.fk_empresa = ?
    AND MONTH(a.data_agendamento) = MONTH(CURRENT_DATE())) AS revenue_current_month,
        (SELECT SUM(se.valor_servico) AS receita_total
        FROM sanittas.agendamento_servico a
        JOIN sanittas.servico_empresa se ON a.fk_servico_empresa = se.id AND a.fk_servico_empresa = se.fk_empresa
        JOIN sanittas.pagamento p ON a.fk_pagamento = p.idpagamento
        WHERE se.fk_empresa = ?) AS revenue_total;`;
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
    FROM sanittas.agendamento_servico a
    JOIN sanittas.servico_empresa se ON a.fk_servico_empresa = se.fk_empresa
    JOIN sanittas.servico s ON se.fk_servico = s.idservico
    WHERE DATE(a.data_agendamento) = CURRENT_DATE() AND se.fk_empresa = ?
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
    const query = `SELECT SUM(se.valor_servico) AS receita_do_dia
    FROM sanittas.agendamento_servico a
    JOIN sanittas.servico_empresa se ON a.fk_servico_empresa = se.fk_empresa
    JOIN sanittas.pagamento p ON a.fk_pagamento = p.idpagamento
    WHERE DATE(a.data_agendamento) = CURRENT_DATE() AND a.fk_servico_empresa = ?;`;
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
    s.idservico,
    s.descricao,
    MONTH(a.data_agendamento) AS mes,
    YEAR(a.data_agendamento) AS ano,
    SUM(se.valor_servico) AS receita
FROM
    sanittas.servico s
JOIN
    sanittas.servico_empresa se ON s.idservico = se.fk_servico
JOIN
    sanittas.agendamento_servico a ON se.fk_empresa = a.fk_servico_empresa AND se.id = a.fk_servico_empresa
JOIN
    sanittas.pagamento p ON a.fk_pagamento = p.idpagamento
WHERE
    a.data_agendamento >= CURDATE() - INTERVAL 6 MONTH AND se.fk_empresa = ?
GROUP BY
    s.idservico,
    s.descricao,
    YEAR(a.data_agendamento),
    MONTH(a.data_agendamento)
ORDER BY
    ano DESC, mes DESC, receita DESC;`;
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
