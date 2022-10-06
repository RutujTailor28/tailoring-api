const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const OrderSchema = new mongoose.Schema({
    deliveryDate: {
        type: Date,
        default: Date.now
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
    },
    pantCount: {
        type: Number,
        default:0
    },
    shirtCount: {
        type: Number,
        default:0
    },
    kurtaCount: {
        type: Number,
        default:0
    },
    blazerCount: {
        type: Number,
        default:0
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