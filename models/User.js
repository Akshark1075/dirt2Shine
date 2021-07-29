const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({username:String,password:String,mobile:String,email:String,address:String,package:String});

User.plugin(passportLocalMongoose,{usernameQueryFields:['email']});

module.exports = mongoose.model('User', User);