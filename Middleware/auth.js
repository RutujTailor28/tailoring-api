const jwt = require('jsonwebtoken');
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../Models/user');

exports.protect = asyncHandler( async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookie.token) {
    //     token = req.cookie.token;
    // }

    //Make sure token exists

    if(!token) {
      return   next(new ErrorResponse(`Not authorized to access this route `,401));
    }

    try {
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded ==> ",decoded);
      // req.user = await User.findById(decoded.id);
        const userExist = await User.findOne({authToken: token});
        console.log("userExist ==> ",userExist);
        if (!userExist){
            return next(new ErrorResponse(`User not found`))
        }else{
            req.user = userExist;
            next();
        }
    } catch (e) {
        return next(new ErrorResponse(`Not authorized to access this route `,401));
    }
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this rout`,403));
        }
        next();
    }
}

