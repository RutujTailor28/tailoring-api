const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  deviceToken: {
    type: Array,
    default: [],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    default: "",
  },
  phone: {
    type: String,
    maxlength: [10, "Phone number must have 10 digits"],
    minlength: [10, "Phone number must have 10 digits"],
  },
  isFirstLogin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpire: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginTime: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String,
    default: "no-photo.jpg",
  },
  userToken: {
    type: Array,
    default: [],
  },
  authToken: {
    type: String,
    default: "",
  }
});

// Encrypt password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("User", UserSchema);
