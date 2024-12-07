'use strict'

const express = require('express');
const cors = require('cors');

module.exports = cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed custom headers
    credentials: true // enable if cookies or authorization headers involved
});