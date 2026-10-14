const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    length: {
        type: String,
        required: true,
        trim: true
    },
    start: {
        type: Date,
        required: true
    },
    resort: {
        type: String,
        required: true,
        trim: true
    },
    perPerson: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});
// Index commonly searched fields to improve database query performance
tripSchema.index({ name: 1, resort: 1, code: 1 });
module.exports = mongoose.model('trips', tripSchema);