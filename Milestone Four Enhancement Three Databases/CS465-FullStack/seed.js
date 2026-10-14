const mongoose = require('mongoose');
const fs = require('fs');

require('./app_server/db/db');

const Trip = mongoose.model('trips');

const trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);

Trip.deleteMany({})
    .then(() => Trip.insertMany(trips))
    .then(() => {
        console.log('Trips imported successfully!');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });