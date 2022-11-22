const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    billNumber: {
        type: Number,
        default: 0
    },
    deliveryDate: {
        type: Date,
        default: Date.now
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
    },
    orderItem: {
        type: Object,
    },
    comment: {
        type: String,
        default:''
    },
    totalItem: {
        type: Number,
        default:0
    },
    totalCost: {
        type: Number,
        default:0
    },
    currentPrice: {
        type: Object,
        default: {}
    },
    billingDate: {
        type: Date,
    },
    status: {
        type: String,
        default:''
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

OrderSchema.index({status:'text'});

module.exports = mongoose.model('Order',OrderSchema);