const express = require('express');
import data from './data';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();
const mongodbUrl = process.env.MONGODB_URL || 'mogodb://localhost/shop_online';

mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false 
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
    return next();
});

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});