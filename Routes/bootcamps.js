const express = require("express");
const router = express.Router();
const advancedResults = require('../Middleware/advancedResults');
const Bootcamp = require('../Models/Bootcamp')
const { protect,authorize } = require('../Middleware/auth')
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRaius,
    bootcampPhotoUpload
} = require('../controller/bootcamps')
const courseRouter = require('./courses')
const reviewRouter = require('./reviews');

router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router
    .route('/radius/:zipcode/:distance').get(getBootcampsInRaius);
router
    .route('/:id/photo').put(protect,authorize('publisher','admin'),bootcampPhotoUpload);

router
    .route('/')
    .get(protect,advancedResults(Bootcamp,'courses'),getBootcamps)
    .post(protect,authorize('publisher','admin'),createBootcamp);
router
    .route('/:id')
    .get(getBootcamp)
    .put(protect,authorize('publisher','admin'),updateBootcamp)
    .delete(protect,authorize('publisher','admin'),deleteBootcamp);

module.exports = router;