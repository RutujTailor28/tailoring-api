const Course = require('../Models/Courses')
const Bootcamp = require('../Models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../Middleware/async')

/**
 * @desc    Get all courses
 * @route   GET /api/v1/course
 * @route   GET /api/v1/bootcamps/:bootcampId/courses
 * @access  Public
 */

exports.getCourses = asyncHandler(async (req,res, next) => {

   if(req.params.bootcampId) {
       const course =  await Course.find({bootcamp: req.params.bootcampId});
       return res.status(200).json({
           success:true,
           count:course.length,
           data:course
       })
   } else {
       res.status(200).json(res.advancedResults);
   }

   const courses = await query;

   res.status(200).json({
       success:true,
       count:courses.length,
       data:courses
   })
});
/**
 * @desc        get single course by _id
 * @route       GET /api/v1/course/:id
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.getCourse = asyncHandler(async (req,res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path:'bootcamp',
        select:'name description'
    })

    if(!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        data:course
    })
});
/**
 * @desc        Add new course based on bootcamp
 * @route       GET /api/v1/bootcamps/:bootcampId/course
 * @access      private
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.addCourse = asyncHandler(async (req,res, next) => {

    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if(!bootcamp){
        return next(new ErrorResponse(`No Bootcamp with the id of ${req.params.bootcampId}`))
    }
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`You are not allowed to add course on this bootcamp`,404));
    }
    const course = await Course.create(req.body);

    res.status(201).json({
        success:true,
        data:course
    })
});

/**
 * @desc        Update course based on bootcamp
 * @route       PUT /api/v1/course/:id
 * @access      private
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.updateCourse = asyncHandler(async (req,res, next) => {

    let course = await Course.findById(req.params.id);

    if(!course){
        return next(new ErrorResponse(`No Course found with the id of ${req.params.id}`))
    }

    if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`You are not allowed to update course`,404));
    }

    course = await Course.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data:course
    })
});


/**
 * @desc        Delete course
 * @route       DELETE /api/v1/course/:id
 * @access      private
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.deleteCourse = asyncHandler(async (req,res, next) => {

    const course = await Course.findById(req.params.id)
    if(!course){
        return next(new ErrorResponse(`No Course found with the id of ${req.params.id}`))
    }
    if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`You are not allowed to update course`,404));
    }

    course.remove();

    res.status(200).json({
        success:true,
        message:"Course deleted successfully"
    })
});