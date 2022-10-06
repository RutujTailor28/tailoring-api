const path = require('path');
const Bootcamp = require('../Models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')
const asyncHandler = require('../Middleware/async')


/**
 * @desc    Get all bootscamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
     res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single bootscamps
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
exports.getBootcamp = asyncHandler( async (req, res, next) => {

        const bootcamps = await Bootcamp.findById(req.params.id);
        if(!bootcamps){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }
        res.status(200).json({
            success:true,
            data:bootcamps
        })

})

/**
 * @desc    Create new bootscamp
 * @route   POST /api/v1/bootcamps
 * @access  Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    //add userId to request body
    req.body.user = req.user.id;

    const publishBootcamp = await Bootcamp.findOne({user: req.user.id})

    if(publishBootcamp && req.user.role !== 'admin') {
        return next(new ErrorResponse(`You have already published one bootcamp, 
        so not allowed to create another bootcamp`,400));
    }


    const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success:true,
            data:bootcamp
        })
})

/**
 * @desc    Update  bootscamp
 * @route   PUT /api/v1/bootcamps/:id
 * @access  Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
      let bootcamp = await Bootcamp.findById(req.params.id)
      if(!bootcamp){
          return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
      }

      if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
          return next(new ErrorResponse(`You are not allowed to update this Bootcamp`,404));
      }
        bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        })
      res.status(200).json({
          success:true,
          data:bootcamp
      })


})

/**
 * @desc    Delete  bootscamp
 * @route   DELETE /api/v1/bootcamps/:id
 * @access  Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }

        if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`You are not allowed to update this Bootcamp`,404));
        }
        
        bootcamp.remove();

        res.status(200).json({
            success:true,
            message:"Deleted successfully"
        })

})


/**
 * @desc    Get bootcamps within a radius
 * @route   DELETE /api/v1/bootcamps/radius/:zipcode/:distance
 * @access  Private
 */
exports.getBootcampsInRaius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //calculate radius by dividing distance with earth radius
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius] } }
    })
    res.status(200).json({
        success:true,
        count:bootcamps.length,
        data:bootcamps
    })

})


/**
 * @desc    Upload bootcamp  image
 * @route   PUT /api/v1/bootcamps/:id/photo
 * @access  Private
 */
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
    }
    if(!req.files){
        return next(new ErrorResponse(`Plead upload a file`,400));
    }
    const {file} = req.files;
    if(!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`File should be an image`,400));
    }

    // check file size
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`File should have size less then ${process.env.MAX_FILE_UPLOAD}`,400));
    }

    //create custom file name
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`,500));
        }
         await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});

        res.status(200).json({
            success:true,
            data:file.name
        })
    } )
})