const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    customerName: {
        type: String,
        required: [true,'Please provide a customer name']
    },
    customerEmail: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ],
        default: ''
    },
    customerPhone: {
        type: String,
        maxlength: [10, 'Phone number must have 10 digits'],
        minlength: [10, 'Phone number must have 10 digits'],
    },
    customerAddress: {
        type: String,
        default: ''
    },
    customerProfileImage: {
        type: String,
        default: 'customer.jpg'
    },
    customerMeasurement: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

customerSchema.index({customerName: 'text',customerPhone: 'text'});

module.exports = mongoose.model('Customer',customerSchema);