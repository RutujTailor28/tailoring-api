const express = require("express");

const {
  getOrders,
  getOrder,
  insertupdate,
  deleteOrder,
  getAllClothingPrice,
  InsertUpdateClothingPrice,
  getOrderByCostomer
} = require("../controller/order");
const router = express.Router();
const { protect } = require("../Middleware/auth");

router.route("/").post(protect, getOrders);
router.route("/insert").post(protect, insertupdate);
router.route("/prices").get(protect, getAllClothingPrice);
router.route("/addPrices").post(protect, InsertUpdateClothingPrice);

module.exports = router;
