const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
});

mongoose.connection.on('error', err => {
    console.log(err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected');
});

require('../models/trip');
require('../../app_api/models/user');