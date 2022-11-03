const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    price: {
        type: Object,
    },
    type: {
        type: String,
    },
});

module.exports = mongoose.model('Price',priceSchema);