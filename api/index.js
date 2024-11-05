'use strict'

//? Express:
const express = require('express');
const app = express();

//? Required modules:

const cors = require('cors');
const mongoose = require('mongoose');    //! seperate config file!!!!

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}))

require('dotenv').config();
mongoose.connect(process.env.MONGODB);
// console.log(process.env.MONGODB);

const HOST = process.env?.HOST || '127.0.0.1';
const PORT = process.env?.PORT || 4000;

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
app.listen(4000);

//? Sync: