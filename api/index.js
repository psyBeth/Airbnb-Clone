'use strict'

//? Express:
const express = require('express');
const app = express();

//? Required modules:

// env variables:
require('dotenv').config();
const HOST = process.env?.HOST || '127.0.0.1';
const PORT = process.env?.PORT || 4000;

// async error handler:
require('express-async-errors');

// cors:
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}))

//? Configurations:

// Database connection:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

//? Middlewares:

// Accept JSON:
app.use(express.json());

// Call static upload file:


//? Routes:
app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    res.json({name, email, password});
} )

//? Error Handler:


//? Run server:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

//? Sync: