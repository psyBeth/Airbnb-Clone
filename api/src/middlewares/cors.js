'use strict'

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // enable if cookies or auth headers involved
}));

app.listen(4000, () => console.log('Server running on port 4000'));