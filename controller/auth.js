const User = require("../Models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { use } = require("express/lib/router");
/**
 * @desc    register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */

exports.register = asyncHandler(async (req, res, next) => {
  const { name, phone, password = "admin123", role = "user" } = req.body;

  if (!name || !phone) {
    return next(new ErrorResponse(`Please provide all details`, 200));
  }

  const phoneExist = await User.findOne({ phone });

  if (phoneExist) {
    return next(new ErrorResponse(`Phone number already exist`, 200));
  }

  const user = await User.create({
    name,
    phone,
    password,
    role,
  });

  res.status(200).json({
    success: true,
    data: user,
  });

  // sendTokenResponse(user, 200, res);
});

/**
 * @desc    Update user details
 * @route   PUT /api/v1/auth/updatedetails
 * @access  Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc        Update password
 * @route       PUT /api/v1/auth/updatepassword
 * @access      Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */

exports.login = asyncHandler(async (req, res, next) => {
  const { phone, password, deviceToken } = req.body;

  //validate email and password
  if (!phone || !password || !deviceToken) {
    return next(new ErrorResponse(`Please provide all details`, 200));
  }

  const user = await User.findOne({ phone }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentials `, 200));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid password`, 200));
  }

  const isDeviceTokenExist = user.deviceToken.includes(deviceToken);

  //check deviceToken exist or not and if not then push in existing array
  if (!isDeviceTokenExist) {
    user.deviceToken.push(deviceToken);
    await user.save();
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc    Get Current user
 * @route   POST /api/v1/auth/me
 * @access  Private
 */

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgotpassword
 * @access  Private
 */

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(`User Not found `, 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you 
    (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});
/**
 * @desc    Reset Password
 * @route   POST /api/v1/auth/resetpassword/:resettoken
 * @access  public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse(`Invalid token `, 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = async (user, statusCode, res) => {
  // console.log("sendTokenResponse ==> ",user);
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOCKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  const updateToken = await User.findByIdAndUpdate(user.id, {authToken: token}, {
    new: true,
    runValidators: true,
  });


  const userUpdatedData = await User.findById(user.id);

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      data: { token: token, userData: userUpdatedData },
      message: "Authentication Successful",
    });
};
