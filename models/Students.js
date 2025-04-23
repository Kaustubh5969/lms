const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    roll_no: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    standard: {
        type: Number,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: Number,
        default:0,
    },
})

const Students = mongoose.model('Student', studentsSchema);
module.exports = Students;