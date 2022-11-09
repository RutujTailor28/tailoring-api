const express = require('express')
const path = require('path');
const dotEnv = require('dotenv')
const morgan = require('morgan');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const errorHandler = require('./Middleware/error')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const xss = require('xss-clean')
const expressRateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

//Route file
const auth = require('./Routes/auth');
const users = require('./Routes/users');
const customers = require('./Routes/customers');
const orders=require('./Routes/orders');

const fileupload = require('express-fileupload')
//Load env vars
dotEnv.config({path: './config/config.env'});

//Connection Database
connectDB();


const app = express();
// Body parser
app.use(express.json())
//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const swaggerOptions = {
    swaggerDefinition: {
        swagger:"2.0",
        info:{
            version:"1.0.0",
            title: "Tailoring API",
            description: "API's to manage Tailoring",
            servers: ["http://localhost:5000"],
        },
        basePath:"/api/v1",
        "paths": { },
        "definitions": { },
        "responses": { },
        "parameters": { },
        "securityDefinitions": { }
    },
    apis:['./Swagger/auth.js', './Swagger/customer.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));


//Sanitize Data
app.use(mongoSanitize());
//Set security headers
app.use(helmet())
//Prevent xss attack
app.use(xss())
//Rate limiting
const limiter = expressRateLimit({
    windowMs:10 * 60 * 1000, // 10 mins
    max:100
})
app.use(limiter);
app.use(hpp());
//unable cors
app.use(cors())
//file upload
app.use(fileupload());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')))

// app.use(logger);
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/customer',customers);
app.use('/api/v1/orders',orders);

app.use(errorHandler);
const PORT = process.env.PORT || 5000

const server = app.listen(PORT);

// handle unhandle rejection

process.on('unhandledRejection',(err, promise) => {
    console.log(`Unhandled rejection: ${err.message}`.red.bold);
    //close server and exit process
    server.close(() => process.exit(1));
})