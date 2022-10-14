const Customer = require("../Models/customer");
const User = require("../Models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const sendEmail = require("../utils/sendEmail");
const { use } = require("express/lib/router");
const path = require("path");
const advancedResults = require("../Middleware/advancedResults");

/**
 * @desc    register customer
 * @route   POST /api/v1/customer/register/:userId
 * @access  Private
 */

exports.register = asyncHandler(async (req, res, next) => {
  const {
    name,
    phone,
    email = "",
    address,
    measurement,
    customerId,
  } = req.body;
  console.log("measurement ==> ", measurement);
  const userId = req.user.id;

  console.log("req.body.customerId ===>", req.body.customerId);
  if (!userId || !name || !phone || !address || !measurement) {
    return next(new ErrorResponse("Please provide all mandatory details", 200));
  }

  if (customerId !== 0) {
    await Customer.findByIdAndUpdate(customerId, {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      customerMeasurement: measurement,
    });

    res.status(200).json({
      success: true,
      data: {},
      message: "Customer details updated successfully",
    });
  } else {
    const phoneExist = await Customer.findOne({ customerPhone: phone });
    if (phoneExist) {
      return next(new ErrorResponse("Phone number already exist", 200));
    }

    await Customer.create({
      userId: userId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      customerMeasurement: measurement,
      customerProfileImage: "",
    });

    res.status(200).json({
      success: true,
      data: {},
      message: "Customer added successfully",
    });

    // const file = req.files.profileImage;
    // if(!file.mimetype.startsWith('image')) {
    //     return next(new ErrorResponse(`File should be an image`,200));
    // }

    // // check file size
    // if(file.size > process.env.MAX_FILE_UPLOAD) {
    //     return next(new ErrorResponse(`File should have size less then ${process.env.MAX_FILE_UPLOAD}`,200));
    // }

    // //create custom file name
    // file.name = `customer_profile_${Date.now()}_${file.name}`;
    // file.mv(`${process.env.CUSTOMER_PROFILE_PATH}/${file.name}`, async err => {
    //     if(err) {
    //         console.error(err);
    //         return next(new ErrorResponse(`Problem with file upload`,200));
    //     }

    //     await Customer.create({
    //         userId: userId,
    //         customerName: name,
    //         customerEmail: email,
    //         customerPhone: phone,
    //         customerAddress: address,
    //         customerMeasurement: JSON.parse(measurement),
    //         customerProfileImage: file.name
    //     });

    //     res.status(200).json({
    //         success: true,
    //         data: {},
    //         message: 'Customer added successfully'
    //     });
    // });
  }
});

/**
 * @desc    get all customer of particular user
 * @route   POST /api/v1/customer/getAllCustomers/:userId
 * @access  Private
 */

exports.getAllCustomers = asyncHandler(async (req, res, next) => {
  const customerData = await Customer.find({ userId: req.user.id });
  const newResponse = getCustomerDataStructure(customerData);

  res.status(200).json({
    success: true,
    data: newResponse,
    message: "",
  });
});

/**
 * @desc    update customer measurement
 * @route   POST /api/v1/customer/updateCustomerMeasurement/:customerId
 * @access  Private
 */

exports.updateCustomerMeasurement = asyncHandler(async (req, res, next) => {
  const { measurement, customerId } = req.body;
  console.log("req.body ==> ", req.body);
  console.log("customerId ==> ", customerId);
  // const customerData = await Customer.findById(req.params.customerId);
  // console.log("customerData ==> ", customerData);
  return next(new ErrorResponse("Customer not found", 200));
  // if (!customerData) {
  //     return next(new ErrorResponse('Customer not found', 200));
  // }
  //
  // await Customer.findByIdAndUpdate(req.params.customerId, {
  //     customerMeasurement: measurement
  // });
  //
  // res.status(200).json({
  //     success: true,
  //     data: {},
  //     message: 'Customer measurement updated successfully'
  // });
});

/**
 * @desc    search customer
 * @route   POST /api/v1/customer/searchCustomer
 * @access  Private
 */

exports.searchCustomer = asyncHandler(async (req, res, next) => {
  const { searchString } = req.body;
  const customerData = await Customer.find({
    $or: [
      {
        customerName: {
          $regex: searchString,
          $options: "i",
        },
      },
      { customerPhone: { $regex: searchString, $options: "i" } },
    ],
    $and: [{ userId: req.user.id }],
  });
  const newResponse = getCustomerDataStructure(customerData);
  res.status(200).json({
    success: true,
    data: newResponse,
    message: "",
  });
});
const getCustomerDataStructure = (customerData) => {
  const newResponse =
    (customerData &&
      customerData.length &&
      customerData.map((data) => {
        return {
          email: data?.customerEmail || "",
          address: data?.customerAddress || "",
          profileImage: data?.customerProfileImage || "",
          id: data?._id || "",
          name: data?.customerName || "",
          mobile: data?.customerPhone || "",
          measurement: {
            shirt: data?.customerMeasurement?.shirt || "",
            pant: data?.customerMeasurement?.pant || "",
            kurta: data?.customerMeasurement?.kurta || "",
            blazer: data?.customerMeasurement?.blazer || "",
          },
          date: data?.createdAt || "",
        };
      })) ||
    [];

  return newResponse;
};
