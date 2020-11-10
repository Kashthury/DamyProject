const express = require('express');
const app = express();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const subjectRoutes=require('./api/routes/subjects');
const teacherRoutes=require('./api/routes/teachers');
const userRoutes = require('./api/routes/user');
const staffRoutes=require('./api/routes/staffs');
const studentRoutes= require('./api/routes/students');
const paymentRoutes= require('./api/routes/payments');



mongoose.connect('mongodb://127.0.0.1:27017/productdb',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Successfully connected to MongoDB!');
})
.catch((error) => {
console.log('Unable to connect to MongoDB!');
console.error(error);
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Contol-Allow-Header","Origin,X-Reqested-With,Content-Type,Accept,Authorization");

    if(req.method ==='OPTIONS'){
        res.header("Access-Control-Allow-Method",'PUT,POST,PATCH,DELETE,GET');
        res.status(200).json({});

    }
    next();
    
});

app.use('/subjects',subjectRoutes);
app.use('/teachers',teacherRoutes);
app.use('/user',userRoutes);
app.use('/staffs',staffRoutes);
app.use('/students',studentRoutes);
app.use('/payments',paymentRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports=app;