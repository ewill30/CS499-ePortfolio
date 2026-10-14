const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET all trips with database search, filtering, and sorting
const tripsList = async (req, res) => {
    try {
        const query = {};

        // Search by trip name, resort, or code
        if (req.query.search) {
            const search = req.query.search;

            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { resort: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter trips by maximum price
        if (req.query.maxPrice) {
            const maxPrice = Number(req.query.maxPrice);

            if (!Number.isNaN(maxPrice)) {
                query.perPerson = { $lte: maxPrice };
            }
        }

        // Choose database sorting
        let sortOption = { name: 1 };

        if (req.query.sort === 'priceLow') {
            sortOption = { perPerson: 1 };
        } else if (req.query.sort === 'priceHigh') {
            sortOption = { perPerson: -1 };
        } else if (req.query.sort === 'startDate') {
            sortOption = { start: 1 };
        }

        const trips = await Trip.find(query).sort(sortOption);

        res.status(200).json(trips);
    } catch (err) {
        console.error('ERROR GETTING TRIPS:', err);
        res.status(500).json(err);
    }
};
// GET one trip by trip code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        console.error('ERROR GETTING TRIP:', err);
        res.status(500).json(err);
    }
};

// POST - create a new trip
const tripsAddTrip = async (req, res) => {
    try {
        console.log('POST BODY:', req.body);

        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        console.log('TRIP CREATED:', trip);

        res.status(201).json(trip);
    } catch (err) {
        console.error('ERROR CREATING TRIP:', err);
        res.status(400).json(err);
    }
};

// PUT - update an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            {
                code: req.params.tripCode
            },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        console.error('ERROR UPDATING TRIP:', err);
        res.status(400).json(err);
    }
};

// DELETE - delete an existing trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(204).send();
    } catch (err) {
        console.error('ERROR DELETING TRIP:', err);
        res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};