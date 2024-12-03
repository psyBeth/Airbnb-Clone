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

// Auth check:

// Run logger:
app.use(require('./src/middlewares/logger'));

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'));


//? Routes:
app.get('/test', (req, res) => {
    res.json('test ok');
});

//! REGISTER TESTING !!

//? Homepath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Airbnb API ok',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
});
app.use(require('./src/routes/index'));

//? Error Handler:
app.use(require('./src/middlewares/errorHandler'));

//? Run server:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

//? Sync:
// seperate file for syncronizaiton