const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '--',
    database: 'mydb',
});
db.connect();

app.get('/data/num-users', (req, res) => {
    const query = `SELECT
    (SELECT COUNT(DISTINCT fk_usuario)
     FROM mydb.agendamento_servico
     WHERE fk_servico_empresa = 5
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS current_users,
    (SELECT COUNT(DISTINCT fk_usuario)
     FROM mydb.agendamento_servico
     WHERE fk_servico_empresa = 5
     AND MONTH(data_agendamento) <= MONTH(CURRENT_DATE())) AS total_users;`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/csat', (req, res) => {
    const query = `SELECT
    COUNT(*) AS total_evaluations,
    SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END) AS positive_evaluations,
    ROUND((SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) AS csat_percentage,
    (SELECT COUNT(*)
     FROM mydb.agendamento_servico
     WHERE fk_servico_empresa = 1
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS total_evaluations_current_month,
    (SELECT SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END)
     FROM mydb.agendamento_servico
     WHERE fk_servico_empresa = 1
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS positive_evaluations_current_month,
    (SELECT ROUND((SUM(CASE WHEN avaliacao_servico >= 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1)
     FROM mydb.agendamento_servico
     WHERE fk_servico_empresa = 1
     AND MONTH(data_agendamento) = MONTH(CURRENT_DATE())) AS csat_percentage_current_month
FROM mydb.agendamento_servico
WHERE fk_servico_empresa = 1;`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/popular-service', (req, res) => {
    const query = `SELECT s.descricao AS nome_servico, COUNT(*) AS quantidade_agendamentos
    FROM mydb.agendamento_servico a
    JOIN mydb.servico s ON a.fk_servico = s.idservico
    WHERE a.fk_servico_empresa = 5
    GROUP BY a.fk_servico
    ORDER BY quantidade_agendamentos DESC
    LIMIT 1;`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/total-revenue', (req, res) => {
    const query = `SELECT 
    COALESCE(
        (SELECT SUM(se.valor_servico) AS receita_total
        FROM mydb.agendamento_servico a
        JOIN mydb.servico_empresa se ON a.fk_servico_empresa = se.fk_idempresa AND a.fk_servico = se.fk_idservico
        JOIN mydb.pagamento p ON a.fk_pagamento = p.idpagamento
        WHERE a.fk_servico_empresa = 5
        AND MONTH(a.data_agendamento) = MONTH(CURRENT_DATE) - 1),
        0
    ) AS revenue_last_month,
    (SELECT SUM(se.valor_servico) AS receita_total
    FROM mydb.agendamento_servico a
    JOIN mydb.servico_empresa se ON a.fk_servico_empresa = se.fk_idempresa AND a.fk_servico = se.fk_idservico
    JOIN mydb.pagamento p ON a.fk_pagamento = p.idpagamento
    WHERE a.fk_servico_empresa = 5
    AND MONTH(a.data_agendamento) = MONTH(CURRENT_DATE)) AS revenue_current_month,
    (SELECT SUM(se.valor_servico) AS receita_total
    FROM mydb.agendamento_servico a
    JOIN mydb.servico_empresa se ON a.fk_servico_empresa = se.fk_idempresa AND a.fk_servico = se.fk_idservico
    JOIN mydb.pagamento p ON a.fk_pagamento = p.idpagamento
    WHERE a.fk_servico_empresa = 5) AS revenue_total;
`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/daily-service', (req, res) => {
    const query = `SELECT s.descricao AS servico, COUNT(*) AS quantidade_atendimentos
    FROM mydb.agendamento_servico a
    JOIN mydb.servico_empresa se ON a.fk_servico_empresa = se.fk_idempresa AND a.fk_servico = se.fk_idservico
    JOIN mydb.servico s ON se.fk_idservico = s.idservico
    WHERE DATE(a.data_agendamento) = CURRENT_DATE() AND a.fk_servico_empresa = 5
    GROUP BY s.descricao;
`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/daily-revenue', (req, res) => {
    const query = `SELECT SUM(se.valor_servico) AS receita_do_dia
    FROM mydb.agendamento_servico a
    JOIN mydb.servico_empresa se ON a.fk_servico_empresa = se.fk_idempresa AND a.fk_servico = se.fk_idservico
    JOIN mydb.pagamento p ON a.fk_pagamento = p.idpagamento
    WHERE DATE(p.data_hora_pagamento) = CURRENT_DATE() AND a.fk_servico_empresa = 5;
`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});
app.get('/data/chart-data', (req, res) => {
    const query = `SELECT
    s.idservico,
    s.descricao,
    MONTH(a.data_agendamento) AS mes,
    YEAR(a.data_agendamento) AS ano,
    SUM(se.valor_servico) AS receita
FROM
    mydb.servico s
JOIN
    mydb.servico_empresa se ON s.idservico = se.fk_idservico
JOIN
    mydb.agendamento_servico a ON se.fk_idempresa = a.fk_servico_empresa AND se.fk_idservico = a.fk_servico
JOIN
    mydb.pagamento p ON a.fk_pagamento = p.idpagamento
WHERE
    a.data_agendamento >= CURDATE() - INTERVAL 6 MONTH AND se.fk_idempresa = 5
GROUP BY
    s.idservico,
    s.descricao,
    YEAR(a.data_agendamento),
    MONTH(a.data_agendamento)
ORDER BY
    ano DESC, mes DESC, receita DESC;
`;
    db.query(query, (error, results) => {
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
