const mongoose = require('mongoose');

require('./app_server/db/db');

const Trip = mongoose.model('trips');

const migratePrices = async () => {
    try {
        const trips = await Trip.find({}).lean();

        let updated = 0;

        for (const trip of trips) {
            const numericPrice = Number(
                String(trip.perPerson).replace(/[$,]/g, '')
            );

            if (!Number.isNaN(numericPrice)) {
                await Trip.collection.updateOne(
                    { _id: trip._id },
                    { $set: { perPerson: numericPrice } }
                );

                updated++;
            }
        }

        console.log(
            `Migration complete. ${updated} trip prices stored as numbers.`
        );

        await mongoose.connection.close();
    } catch (err) {
        console.error('Migration failed:', err);
        await mongoose.connection.close();
    }
};

migratePrices();