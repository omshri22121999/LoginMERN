import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

// and create our instances
const app = express();
const router = express.Router();
const userRoute = require('./routes/userRouter');
mongoose.connect('mongodb://localhost:27017/omshri', function(err) {
    if (err) {
        console.log("Not Connected");
    } else {
        console.log("Connected to MongoDB");
    }
});
const API_PORT = process.env.API_PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use('/',userRoute);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
