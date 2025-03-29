require('dotenv').config();
const express = require('express');
const db = require('./db');

const router = express.Router();


const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
};


const queryToSQL = (query) => {
    if (query.includes("list all users")) {
        return "SELECT * FROM users;";
    } else if (query.includes("oldest user")) {
        return "SELECT * FROM users ORDER BY age DESC LIMIT 1;";
    }
    return "Invalid query";
};


router.post('/query', authenticate, (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const sql = queryToSQL(query);
    if (sql === "Invalid query") {
        return res.status(400).json({ error: "Invalid natural language query" });
    }

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ query, sql, result: rows });
    });
});


router.post('/explain', authenticate, (req, res) => {
    const { query } = req.body;
    const sql = queryToSQL(query);
    res.json({ query, translatedSQL: sql });
});


router.post('/validate', authenticate, (req, res) => {
    const { query } = req.body;
    const sql = queryToSQL(query);
    res.json({ query, valid: sql !== "Invalid query" });
});

module.exports = router;
