const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../Middleware/auth");

const {
  getOrders,
  getOrder,
  insertupdate,
  deleteOrder,
} = require("../controller/order");
const Order = require("../Models/order");
const advancedResults = require("../Middleware/advancedResults");
const User = require("../Models/user");
const { getUsers, createUser } = require("../controller/users");

router
  .route("/")
  .get(advancedResults(Order), getOrders)
  .post(protect, authorize("publisher", "admin"), insertupdate);
router
  .route("/")
  .post(getOrder)
  .post(protect, authorize("publisher", "admin"), insertupdate)
  .delete(protect, authorize("publisher", "admin"), deleteOrder);

module.exports = router;
