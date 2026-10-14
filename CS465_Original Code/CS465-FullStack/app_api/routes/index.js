const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

const { expressjwt: jwt } = require('express-jwt');

// JWT authentication middleware
const auth = jwt({
    secret: process.env.JWT_SECRET || 'secret',
    algorithms: ['HS256']
});

// Authentication routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Trip routes
router
    .route('/trips')
    .get(ctrlTrips.tripsList)
    .post(auth, ctrlTrips.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode)
    .put(auth, ctrlTrips.tripsUpdateTrip)
    .delete(auth, ctrlTrips.tripsDeleteTrip);

module.exports = router;