const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    auther: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['History', 'Biography', 'fairy Tale', 'Mystery', 'Science', 'Poerty', 'Drama', 'Other'],
    },
    status: {
        type: String,
        default: "Available",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    copies: {
        type: Number,
        default: 1,
    },
})

const Books = mongoose.model('Book', booksSchema);
module.exports = Books;