
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;


const Order = new Schema({orderid:String,name:String,email:String,mobile:String,package:String,bookedDays:String,carType:String,address:String,bookingDate:String,totalCost:String,startDate:String,endDate:String,totalWashes:String,washesLeft:String});



module.exports = mongoose.model('Order', Order);