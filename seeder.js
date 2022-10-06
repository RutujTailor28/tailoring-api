const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv')


dotenv.config({path:'./config/config.env'});

const Bootcamp = require("./Models/Bootcamp")
const Course = require("./Models/Courses")
const User = require("./Models/user")
const Review = require("./Models/Review")

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
});


const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8'));

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`,'utf-8'));

//import into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await User.create(users)
        await Review.create(reviews)
        console.log("Data imported....");
        process.exit();
    } catch (e) {
        console.log(e)
    }
}


//Delete from db
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        await User.deleteMany()
        await Review.deleteMany()
        console.log("Data Deleted....");
        process.exit();
    } catch (e) {
        console.log(e)
    }
}

if(process.argv[2] === "-i") {
    importData();
} else if(process.argv[2] === "-d") {
    deleteData();
}

