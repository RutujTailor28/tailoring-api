const Order = require("../Models/order");
const Customer = require("../Models/customer");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const { use } = require("express/lib/router");
const path = require("path");
const advancedResults = require("../Middleware/advancedResults");
const User = require("../Models/user");
const Price = require("../Models/Price")
/**
 * @desc    insert order
 * @route   POST /api/v1/orders/:id
 * @access  Private
 */

exports.insertupdate = asyncHandler(async (req, res, next) => {
  const {
    id,
    deliveryDate,
    customerId,
    pantCount,
    orderItem,
    comment,
    totalItem,
    totalCost,
    status,
    createdDate,
    currentPrice,
  } = req.body;

  const addBillingDate = status === 'complete' ? Date.now() : ""

  if(!id) {

    const order = await Order.find({ userId: req.user.id });
    await Order.create({
      deliveryDate: deliveryDate,
      customerId: customerId,
      pantCount: pantCount,
      orderItem: orderItem,
      comment: comment,
      totalItem: totalItem,
      totalCost: totalCost,
      status: status,
      createdDate: createdDate,
      currentPrice: currentPrice,
      billingDate: addBillingDate,
      userId: req.user.id,
      billNumber: order.length + 1
    });

    res.status(200).json({
      success: true,
      data: {},
      message: "Order added successfully",
    });
  } else {
    const orderExist = await Order.findById(id);
    if (!orderExist) {
      await Order.create({
        deliveryDate: deliveryDate,
        customerId: customerId,
        pantCount: pantCount,
        orderItem: orderItem,
        comment: comment,
        totalItem: totalItem,
        totalCost: totalCost,
        status: status,
        createdDate: createdDate,
        currentPrice: currentPrice,
        userId: req.user.id,
        billingDate: addBillingDate,
      });
  
      res.status(200).json({
        success: true,
        data: {},
        message: "Order added successfully",
      });
    } else {
      await Order.findByIdAndUpdate(id, {
        deliveryDate: deliveryDate,
        customerId: customerId,
        pantCount: pantCount,
        orderItem: orderItem,
        comment: comment,
        totalItem: totalItem,
        totalCost: totalCost,
        status: status,
        currentPrice: currentPrice,
        billingDate: addBillingDate,
      });
  
      res.status(200).json({
        success: true,
        data: {},
        message: "Order updated successfully",
      });
    }
  }

  
});

/**
 * @desc    Get all orders
 * @route   GET /api/v1/orders
 * @access  Public
 */

exports.getOrders = asyncHandler(async (req, res, next) => {
  const { customerId } = req.body;
  console.log('req.body',req.body);
  let order;
  if(customerId) {
    console.log('customerId', customerId)
    order = await Order.find({ userId: req.user.id, customerId: customerId }).populate("customerId");
  } else {
    console.log('customerId12', customerId)
    order = await Order.find({ userId: req.user.id }).populate("customerId");
  }
  console.log('order',order)
  res.status(200).json({
    success: true,
    data: order,
    message: "orderlist",
  });
});
/**
 * @desc        get single order by _id
 * @route       POST /api/v1/orders
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.body.id);
  //
  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/orders/:id
// @access    Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

const getDataStructure = (Data) => {
  const newResponse =
    (Data &&
      Data.length &&
      Data.map((data) => {
        return {
          name: data?.customerId.customerName || "",
          blazerCount: data?.blazerCount || "",
          comment: data?.comment || "",
          pantCount: data?.pantCount || 0,
          shirtCount: data?.shirtCount || 0,
          kurtaCount: data?.kurtaCount || 0,
          totalItem: data?.totalItem || 0,
          totalCost: data?.totalCost || 0,
          status: data?.status || "pending",
          customerId: data?.customerId._id || "",
          customerPhone: data?.customerId.customerPhone || "",
          location: data?.customerId.customerAddress || "",
          deliveryDate: data?.deliveryDate || "",
          Measurement: data?.customerMeasurement || {},
        };
      })) ||
    [];

  return newResponse;
};

exports.getAllClothingPrice = asyncHandler(async (req, res, next) => {
  const clothingPriceData = await Price.find({ userId: req.user.id });
  res.status(200).json({
    success: true,
    data: clothingPriceData[0] || {},
    message: "Price List",
  });
});


exports.InsertUpdateClothingPrice = asyncHandler(async (req, res, next) => {
  const {
    id,
    price,
    type,
  } = req.body;
  if(!id) {
    await Price.create({
      price: price,
      userId: req.user.id,
    });
    res.status(200).json({
      success: true,
      data: {},
      message: "Price added successfully",
    });
  } else {
    await Price.findByIdAndUpdate(id, {
      price: price,
    });
    res.status(200).json({
      success: true,
      data: {},
      message: "Price updated successfully",
    });
  }
});



