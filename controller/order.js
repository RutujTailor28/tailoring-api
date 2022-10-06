const Order = require('../Models/order');
const Customer = require('../Models/customer');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../Middleware/async')
const {use} = require("express/lib/router");
const path = require("path");
const advancedResults = require('../Middleware/advancedResults');
const User = require("../Models/user");

/**
 * @desc    insert order
 * @route   POST /api/v1/orders/:id
 * @access  Private
 */

exports.insertupdate = asyncHandler(async (req, res, next) => {
    console.log("request data => ",req.body);
    const {deliveryDate, customerId, pantCount, shirtCount, kurtaCount, blazerCount, comment, totalItem, totalCost,status,createdDate} = req.body;
    const id = req.params.id;
    const orderExist = await Order.findById(id);

    if (!orderExist){
        await Order.create({
            deliveryDate: deliveryDate,
            customerId: customerId,
            pantCount: pantCount,
            shirtCount: shirtCount,
            kurtaCount: kurtaCount,
            blazerCount: blazerCount,
            comment: comment,
            totalItem:totalItem,
            totalCost:totalCost,
            status:status,
            createdDate:createdDate
        });

        res.status(200).json({
            success: true,
            data: {},
            message: 'Order added successfully'
        });
    }
    else{
        await Order.update({
            deliveryDate: deliveryDate,
            customerId: customerId,
            pantCount: pantCount,
            shirtCount: shirtCount,
            kurtaCount: kurtaCount,
            blazerCount: blazerCount,
            comment: comment,
            totalItem:totalItem,
            totalCost:totalCost,
            status:status,
            createdDate:createdDate
        });

        res.status(200).json({
            success: true,
            data: {},
            message: 'Order updated successfully'
        });
    }

})

/**
 * @desc    Get all orders
 * @route   GET /api/v1/orders
 * @access  Public
 */

exports.getOrders = asyncHandler(async (req,res, next) => {
    res.status(200).json(res.advancedResults);
});
/**
 * @desc        get single order by _id
 * @route       GET /api/v1/orders/:id
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.getOrder = asyncHandler(async (req,res, next) => {
    console.log('req', Order)
    const order = await Order.findById(req.params.id);
    //
    res.status(200).json({
        success: true,
        data: order
    });
});

// @desc      Delete user
// @route     DELETE /api/v1/orders/:id
// @access    Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});

   

