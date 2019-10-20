'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const port = process.env.PORT;

let corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(require('./routes'));

if(process.env.NODE_ENV === 'development') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
