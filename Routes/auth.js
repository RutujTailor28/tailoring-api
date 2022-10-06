const express = require('express')
const  {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
    logout
} = require('../controller/auth')
const router = express.Router();
const { protect } = require('../Middleware/auth')


router
    .route('/registers')
    .post((req, res, next) => {
        res.status(200);
    });
router
    .route('/register')
    .post(register);

router
    .route('/updatedetails')
    .put(protect,updateDetails);
router
    .route('/updatepassword')
    .put(protect,updatePassword);
router
    .route('/login')
    .post(login);
router
    .route('/logout')
    .get(logout);
router
    .route('/me')
    .get(protect,getMe);
router
    .route('/forgotpassword')
    .post(forgotPassword);
router
    .route('/resetpassword/:resettoken')
    .put(resetPassword);
module.exports = router;