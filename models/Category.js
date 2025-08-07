const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    history: {
        type: Number,
        default: 0,
    },
    biography: {
        type: Number,
        default: 0,
    },
    faily_tails: {
        type: Number,
        default: 0,
    },
    mystery: {
        type: Number,
        default: 0,
    },
    science: {
        type: Number,
        default: 0,
    },
    poerty: {
        type: Number,
        default: 0,
    },
    drama: {
        type: Number,
        default: 0,
    },
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;