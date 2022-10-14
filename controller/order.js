const Order = require("../Models/order");
const Customer = require("../Models/customer");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const { use } = require("express/lib/router");
const path = require("path");
const advancedResults = require("../Middleware/advancedResults");
const User = require("../Models/user");

/**
 * @desc    insert order
 * @route   POST /api/v1/orders/:id
 * @access  Private
 */

exports.insertupdate = asyncHandler(async (req, res, next) => {
  console.log("request data => ", req.body);
  const {
    deliveryDate,
    customerId,
    pantCount,
    shirtCount,
    kurtaCount,
    blazerCount,
    comment,
    totalItem,
    totalCost,
    status,
    createdDate,
  } = req.body;
  const id = req.params.id;
  const orderExist = await Order.findById(id);

  if (!orderExist) {
    await Order.create({
      deliveryDate: deliveryDate,
      customerId: customerId,
      pantCount: pantCount,
      shirtCount: shirtCount,
      kurtaCount: kurtaCount,
      blazerCount: blazerCount,
      comment: comment,
      totalItem: totalItem,
      totalCost: totalCost,
      status: status,
      createdDate: createdDate,
    });

    res.status(200).json({
      success: true,
      data: {},
      message: "Order added successfully",
    });
  } else {
    await Order.update({
      deliveryDate: deliveryDate,
      customerId: customerId,
      pantCount: pantCount,
      shirtCount: shirtCount,
      kurtaCount: kurtaCount,
      blazerCount: blazerCount,
      comment: comment,
      totalItem: totalItem,
      totalCost: totalCost,
      status: status,
      createdDate: createdDate,
    });

    res.status(200).json({
      success: true,
      data: {},
      message: "Order updated successfully",
    });
  }
});

/**
 * @desc    Get all orders
 * @route   GET /api/v1/orders
 * @access  Public
 */

exports.getOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find().populate("customerId");
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
  console.log("req", Order);
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
