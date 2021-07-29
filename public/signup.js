$("#username").on("keyup",function(event){
	validateUsername(this);
});
$("#mobile").on("keyup",function(event){
	validatePhonenumber(this);
});
$("#email").on("keyup",function(event){
	validateEmail(this);
});
$("#password").on("keyup",function(event){
	validatePassword(this);
});

$("#address").on("keyup",function(event){
	validateAddress(this);
});

$("#newpwd").on("keyup",function(event){
	validateNewPassword(this);
});
$("#confirmpwd").on("keyup",function(event){
	validateConfirmPassword();
});





function validateUsername(fld) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores
 
    if (fld.value == "") {
    
        error = "You didn't enter a username\n";
        $("#username").addClass('is-invalid')
        $("#invaliduname").text(error);
        return false;
 
    } else if (illegalChars.test(fld.value)) {
        
        error = "Only letters, numbers, and underscores are allowed.\n";
		$("#username").addClass('is-invalid')
        $("#invaliduname").text(error);
		return false;
 
    } else if ((fld.value.length < 3) || (fld.value.length > 15)) {
        
        error = "The username must be of 3-15 characters.\n";
		$("#username").addClass('is-invalid')
        $("#invaliduname").text(error);
		return false;
 
    } else {
        $("#username").removeClass('is-invalid')
        $("#username").addClass('is-valid')
    }
    return true;
}
function validatePhonenumber(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.value.match(phoneno)) {
  	  $("#mobile").removeClass('is-invalid')
        $("#mobile").addClass('is-valid')
    return true;
  }
  else {
  	 error = "Please enter a valid number\n";
    $("#mobile").addClass('is-invalid')
        $("#invalidmob").text(error);
    return false;
  }
}
var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
function validateEmail(email) {
   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
   if (re.test(email.value)) {
   	console.log("hi");
    $("#email").removeClass('is-invalid')
    $("#email").addClass('is-valid')
        return true
  } else {
  	 error = "Email id is invalid\n";
    $("#email").addClass('is-invalid')
        $("#invalidmail").text(error);
  }
  return false;
}
function validatePassword(password) {
  var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   if (re.test(password.value)) {
    $("#password").removeClass('is-invalid')
    $("#password").addClass('is-valid')
        return true
  } else {
  	 error = " Minimum 8 characters required(Atleast 1 uppercase, 1 lowercase, 1 spl character)\n";
    $("#password").addClass('is-invalid')
        $("#invalidpwd").text(error);
  }
  return false;
}

function validateFlatno(flatno) {
    if ($.isNumeric(flatno.value)) { 
    $("#flatno").removeClass('is-invalid');
    $("#flatno").addClass('is-valid');
        return true
  } else {
  	 error = "Invalid number\n";
    $("#flatno").addClass('is-invalid')
        $("#invalidflatno").text(error);
  }
  return false;
}
function validateAddress(fld){
	if (fld.value != "") {
		 $("#address").removeClass('is-invalid');
    $("#address").addClass('is-valid');
    return true 
    }
	else{
	 error = "Invalid Address\n";
    $("#address").removeClass('is-valid');
	 $("#address").addClass('is-invalid');
	$("#invalidAddress").text(error);
	return false
}}

function validateNewPassword(password) {
  var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   if (re.test($("#newpwd").val())) {
	  
    $("#newpwd").removeClass('is-invalid')
    $("#newpwd").addClass('is-valid')
        return true
  } else {
	   console.log($("#newpwd").val());
  	 error = " Minimum 8 characters required(Atleast 1 uppercase, 1 lowercase, 1 spl character)\n";
	     $("#newpwd").removeClass('is-valid');
    $("#newpwd").addClass('is-invalid')
        $("#invalidnewpwd").text(error);
	   return false;
  }
 
}
function validateConfirmPassword() {
 
	
   if ($("#newpwd").val()==$("#confirmpwd").val()) {
    $("#confirmpwd").removeClass('is-invalid');
    $("#confirmpwd").addClass('is-valid');
        return true
  } else {
  	 error = "Passwords does not match";
	     $("#confirmpwd").removeClass('is-valid')
    $("#confirmpwd").addClass('is-invalid');
	  
        $("#invalidconfirmpwd").text(error);
  }
  return false;
}

function validatePasswordMatch() {

	
   if ($("#newpwd").val()!=$("#oldpwd").val()) {
    $("#newpwd").removeClass('is-invalid');
    $("#newpwd").addClass('is-valid');
        return true
  } else {
  	 error = "New password cannot be the same as the old password";
	     $("#newpwd").removeClass('is-valid')
    $("#newpwd").addClass('is-invalid');
	  
        $("#invalidnewpwd").text(error);
  }
  return false;
}
