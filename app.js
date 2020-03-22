const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const api = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', api);

module.exports = app;
