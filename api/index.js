const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}))

mongoose.connect(process.env.MONGODB)

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    res.json({name, email, password});
} )

app.listen(4000);