const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
   const conn = await  mongoose.connect(process.env.MONGO_URI,{
       useNewUrlParser:true,
       useCreateIndex:true,
       useFindAndModify:false,
       useUnifiedTopology: true
   });
   console.log(`MongoDB connected: ${conn.connection.host}`.blue.underline.bold)
}

module.exports = connectDb;