const Trip = require('../models/trip');

const index = (req, res) => {
    res.render('index', {
        title: 'Travlr Getaways'
    });
};

const travel = async (req, res) => {
    try {
        const trips = await Trip.find();

        res.render('travel', {
            title: 'Travel',
            trips: trips
        });
    } catch (err) {
        console.error(err);

        res.render('travel', {
            title: 'Travel',
            trips: []
        });
    }
};

const rooms = (req, res) => {
    res.render('rooms', {
        title: 'Rooms'
    });
};

const meals = (req, res) => {
    res.render('meals', {
        title: 'Meals'
    });
};

const news = (req, res) => {
    res.render('news', {
        title: 'News'
    });
};

const about = (req, res) => {
    res.render('about', {
        title: 'About'
    });
};

const contact = (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
};

module.exports = {
    index,
    travel,
    rooms,
    meals,
    news,
    about,
    contact
};
