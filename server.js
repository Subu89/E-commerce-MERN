const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('ecom-frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ecom-frontend', 'build', 'index.html'));
    });
}

mongoose.connect(dbURI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));