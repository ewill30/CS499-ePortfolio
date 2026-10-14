const express = require('express');
const router = express.Router();

const ctrlTraveler = require('../controllers/traveler');

router.get('/', ctrlTraveler.index);
router.get('/travel', ctrlTraveler.travel);
router.get('/rooms', ctrlTraveler.rooms);
router.get('/meals', ctrlTraveler.meals);
router.get('/news', ctrlTraveler.news);
router.get('/about', ctrlTraveler.about);
router.get('/contact', ctrlTraveler.contact);

module.exports = router;