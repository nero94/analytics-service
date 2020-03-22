const firebase = require('firebase');
const config = require('config');

const app = firebase.initializeApp(config.firebase);
const database = firebase.database(app);

module.exports = { app, database };
