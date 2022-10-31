const express = require("express");
const advancedResults = require("../Middleware/advancedResults");
const {
  register,
  getAllCustomers,
  updateCustomerMeasurement,
  searchCustomer, getCustomer,
} = require("../controller/customers");
const router = express.Router();
const { protect } = require("../Middleware/auth");
const Customer = require("../Models/customer");

// router.route('/register/:userId').post(protect,register);
router.route("/register").post(protect, register);
router.route("/getAllCustomers").get(protect, getAllCustomers);
router
  .route("/updateCustomerMeasurement/:customerId")
  .put(protect, updateCustomerMeasurement);
router.route("/searchCustomer").post(protect, searchCustomer);
router.route("/getCustomer").post(protect, getCustomer);
module.exports = router;
