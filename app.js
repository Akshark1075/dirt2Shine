var express=require("express");
var app=express();
var session = require("express-session"),
    bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({
  type: ['application/json', 'text/plain']
}));
var methodOverride=require("method-override");
var mongoose=require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://dbadmin:sijinthatha123@cluster0.ii95r.mongodb.net/dirt2shine?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;
var passportLocalMongoose=require("passport-local-mongoose");
var flash=require("connect-flash");
var User=require("./models/User.js");
var Order=require("./models/Order.js");
// var Slots=require("./models/BOOKEDSLOTS.js");
"use strict";
const nodemailer = require("nodemailer");

  app.use(express.static('public'));
	app.use(express.static('partials'));
app.use(require("express-session")({
	secret:"This is a messaging app",
	resave:false,
	saveUninitialized:false
}));

  app.use(passport.initialize());
  app.use(passport.session());
app.use(flash());
 app.use(function(req, res, next){
    res.locals.success = req.flash("success");
	  res.locals.error = req.flash("danger");
	 res.locals.loginerr = req.flash("error");
	  res.locals.info= req.flash("info");
    next();
});
passport.use(User.createStrategy());
app.set("view engine","ejs");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
	req.flash("This is just a demo website.")

	res.render('index',{user:req.user});
});
// app.get("/monthlypackages",function(req,res){
// 	res.render('monthlypackages',{user:req.user})
// });
// app.get("/individualpackage",function(req,res){
// 	res.render('individualpackage',{user:req.user})
// });
app.get("/signup",function(req,res){
res.render("signup",{user:req.user});
});
app.post("/signup",function(req,res){
	var address=req.body.address.replace( /[\r\n]+/gm, "" ); 
	
		var newuser=new User({username:req.body.username.trimRight(),mobile:req.body.mobile,email:req.body.email.trimRight(),address:address,package:"none"});
	User.register(newuser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			req.flash("danger",err);
			res.redirect("/signup");			
		}
		else{
			passport.authenticate("local",{failureFlash: true})(req,res,function(){
				req.flash("success","Registration successful")
				res.redirect("/");	
			});	
			
		}
		
	});
	
});
app.get("/login",function(req,res){
	if(!req.user){
res.render("login",{user:req.user});
	}
	else{
		req.flash("danger","You cannot do that while logged in")
		res.redirect("/")
	}
});
app.post('/login',		
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',failureFlash:true ,successFlash: 'Successfully Logged in'}),function(req,res){
	console.log("done");
		 
});
app.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Successfully logged out!")
res.redirect("/");
});
app.get("/forgotPassword",function(req,res){
	res.render("forgotPassword")
});
app.post("/forgotPassword",function(req,res){
	User.findOne({ $or: [ { username:req.body.username }, { email:req.body.email } ] },function(err,user){
		if(err){
			console.log(err);
			req.flash("danger","Oops! Something went wrong");
			res.redirect("/forgotPassword");
		}
		else{
			if(user){
				console.log(user);
				var transporter = nodemailer.createTransport({
		  host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
 service: 'gmail',
 auth: {
        user: 'arvindtheboss1997@gmail.com',
        pass: 'thespiderman'
    }
});
				var url="https://dirttoshine.run-us-west1.goorm.io/forgotPassword/"+user._id+"/resetPassword";
				console.log(url);
	const mailOptions = {
		
  from: 'arvindtheboss1997@gmail.com', // sender address
  to: user.email, // list of receivers
  subject: 'D!rt2Shine Password Reset', // Subject line
  html: '<p>Hey '+user.username+',<br><br>To reset your password for Dirt2Shine, please click the following link<br><br><a href="'+url+'"> Click Here </a><br><br>If you don\'t want to reset your password, you can ignore this message-someone probably typed in your username or email address by mistake.<br><br>Thanks!<br>Team D!rt2Shine</p>'
		
		
};

			
	transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
		req.flash("info","Password reset link has sent to your mail id");
	res.redirect("/forgotPassword");
});
			}
			else{
				req.flash("danger","Invalid username/email");
				res.redirect("/forgotPassword");
				
				
			}
		}
		
		
	});
	
	
});
app.get("/forgotPassword/:id/resetPassword",function(req,res){
	User.findById(req.params.id,function(err,user){
		if(err){
			console.log(err);
			req.flash("danger","Oops Something went wrong");
			res.redirect("/forgotPassword");
		}
		else{
	res.render("resetPassword",{user:user});
		}
		});
});
app.post("/forgotPassword/:id/resetPassword",function(req,res){
	var id=req.params.id;
	var myid="";
	for(i in id){
		if(id[i]!="+"){myid+=id[i];}
	}
	
	User.findById(myid,function(err,user){
		if(err){
			console.log(err);
			req.flash("danger","Oops Something went wrong");
			
			res.redirect("/forgotPassword");
		}
		else{
			user.setPassword(req.body.newpwd, function(err, user){
				if(err){
					console.log(err);
			req.flash("danger",err);
			res.redirect("/forgotPassword");
					console.log("Failed");
				}
				else{
					console.log('Success');
					  user.save(function(err){
						  req.flash("success","Password changed successfully")
					res.redirect("/login");
                            });
					
				}
				
		});
		}
	});

});
app.get("/changePassword",isLoggedIn,function(req,res){
	res.render("changePassword");
});
app.post("/changePassword",isLoggedIn,function(req,res){
	req.user.changePassword(req.body.oldpwd, req.body.newpwd, function(err){
		if(err){
					console.log(err);
			req.flash("danger",err);
			res.redirect("/changePassword");
					console.log("Failed");
				}
		else{
			console.log('Success');
					  req.user.save(function(err){
						  req.flash("success","Password changed successfully")
						  req.logout();
					res.redirect("/login");
                            });
			
		}
	});
});
app.get("/booknow/:type",isLoggedIn,function(req,res){
	
	
	res.render("booknow",{user:req.user,type:req.params.type});
		
	
	
});
app.post("/createOrder",function(req,res){
	req.flash("danger","Sorry we are not taking any orders right now")
	req.logout();
res.redirect("/");
// 	var options = {
//   amount: Number(req.body.cost),  // amount in the smallest currency unit
//   currency: "INR",
//   receipt: "D2S_001",
//   payment_capture: '1',
// 				notes:{}
// };
// instance.orders.create(options, function(err, order) {
//   console.log(order);
// 	res.send(order);
// });
	
});
app.post("/placeorder",isLoggedIn,function(req,res){
	console.log("hitting post")
	

	User.findOne( { username:req.user.username },function(err,user){
		if(err){
			console.log(err);
			 req.flash("danger","Oops! Something went wrong");
			res.redirect("/booknow/"+req.body.package); 
		}
		else{
			
	Order.create({orderid:"D2S001",name:req.body.name,email:req.body.email,mobile:req.body.mobile,package:req.body.package,bookedDays:req.body.bookedDays,carType:req.body.carType,address:req.body.address,totalCost:String(req.body.cost),startDate:"",endDate:"",totalWashes:req.body.washCount,washesLLeft:""},function(err){
		if(err){
			console.log(err);
			 req.flash("danger","Oops! Something went wrong");
		res.redirect("/booknow/"+req.body.package);  
		}
		else{
			
			user.package=req.body.package;
		user.address=req.body.address;
			 user.save(function(err){
				 if(err){
					   req.flash("danger","Oops! Something went wrong");
			res.redirect("/booknow/"+req.body.package); 
							
							}else{
	var transporter = nodemailer.createTransport({
		  host: 'smtp.gmail.com',
    port: 993,
    secure: true, 
 service: 'gmail',
 auth: {
        user: 'arvindtheboss1997@gmail.com',
        pass: 'thespiderman'
    }
});
				
	const mailOptions1 = {
		
  from: 'arvindtheboss1997@gmail.com', // sender address
  to: req.user.email, // list of receivers
  subject: 'D!rt2Shine Booking Confirmation', // Subject line
  html: '<p>Hey '+req.body.name+',<br><br>Please be informed that your booking has been made successfully<br><br>Please Verify your booking details<br><br>Order Number : '+"D2S001"+'<br>Name : '+req.body.name+'<br>Package : '+req.body.package+'<br>Washing Day/Days:'+req.body.bookedDays+'<br>Car Type : '+req.body.carType+'<br>Number of washes/month'+req.body.washCount+'<br>Address : '+req.body.address+'<br>Booking Date : '+req.body.bookingDate+'<br>Total Cost : '+req.body.cost+'<br><br>*For slot modifications/cancellations please contact us*<br><br>Thanks!<br>Team D!rt2Shine</p>'
		
		
};

		const mailOptions2 = {
		
  from: 'arvindtheboss1997@gmail.com', // sender address
  to: 'arvindtheboss1997@gmail.com', // list of receivers
  subject: 'D!rt2Shine Booking Confirmation', // Subject line
  html: '<p>Hey Team,<br><br>We have received an order<br><br>Please find the order details below<br><br>Order Number : '+"D2S001"+'<br>Name : '+req.body.name+'<br>Email id : '+req.user.email+'<br>Mobile :'+req.user.mobile+'<br>Package : '+req.body.package+'<br>Washing Day/Days:'+req.body.bookedDays+'<br>Car Type : '+req.body.carType+'<br>Number of washes/month'+req.body.washCount+'<br>Address : '+req.body.address+'<br>Booking Date : '+req.body.bookingDate+'<br>Total Cost : '+req.body.cost+'<br><br>Thanks!<br>Team D!rt2Shine</p>'
		
		
};

			
	transporter.sendMail(mailOptions1, function (err, info) {
   if(err){
     console.log(err);
		req.flash("danger","Oops! Something went wrong");
			res.redirect("/booknow/"+req.body.package); 
	}else{	
			transporter.sendMail(mailOptions2, function (err, info) {
		if(err){ console.log(err);
			console.log("oops")
   req.flash("danger","Oops! Something went wrong");
			res.redirect("/booknow/"+req.body.package); 
				}
							else{
							alert("Your order has been booked successfully")
							 req.flash("info","Your Order has been placed successfully. We will reach out to you soon!");
							 res.send(JSON.stringify({url:"/"})); 
	
							}
					
		
	});
			
				
						}
	});
		
							}
					 
					  }); 
			 
					}
		
				})
			
				
				}
		
		});
		res.send(JSON.stringify({url:"/"})); 
	
});
app.get("/about",function(req,res){
	res.render("about",{user:req.user,type:req.params.type})
})
// app.get("/getSlotData",function(req,res){
// 	Slots.find({},function(err,slots){
// 		if(err){
// 			console.log(err);
// 			req.flash("danger","Oops Something went wrong");
// 			res.redirect("/");
// 		}
// 		else{
// 	res.json(JSON.stringify(slots));
// 		}
// 		});
	
// });
app.listen(process.env.PORT||3000,function(){console.log("starting server");});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("danger","Please Log in to continue")
	res.redirect("/login");
	
}


//  user.setPassword(req.body.password, function(err, user){ ..
 // user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) ...