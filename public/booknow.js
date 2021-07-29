
var weekdays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];

checkForDiamond($(".card-title").text());
	updateCost($(".card-title").text());


function checkForDiamond(type){
	if(type=="Diamond"){
		$("#weekdiv").css("display","none");
	}
}
function setLimit(packageType){
	
	if(packageType=="Silver"){
		
		return 1;
	}
	else if(packageType=="Gold"){
	
		return 2;
	}
	else if(packageType=="Platinum"){
	
		return 3;
	}
	else if(packageType=="Diamond"){
		return 0
	}
	
}
function noOfWashes(packageType){
	
	if(packageType=="Silver"){
		
		return 4;
	}
	else if(packageType=="Gold"){
	
		return 8;
	}
	else if(packageType=="Platinum"){
	
		return 12;
	}
	else if(packageType=="Diamond"){
		return 16
	}
	
}
$("#checka").on("change",function(event){
	if($("#checka").is(":checked")){
	
		$("#checkb"). prop("checked", false);
	}
	else{
	
		$("#checkb"). prop("checked", true);	
	}
	updateCost($(".card-title").text());
});
$("#checkb").on("change",function(event){
if($("#checkb").is(":checked")){
	
		$("#checka"). prop("checked", false);
	}
	else{
	
		$("#checka"). prop("checked", true);	
	}
		updateCost($(".card-title").text());
});

function updateCost(packageType){
	var cost;
	if(packageType=="Silver"){
		if($("#checka").is(":checked")){
			 cost="800";
		$("#cost").text(cost);	
			
		}
		else{
			cost="1000";
			$("#cost").text(cost);
		}
		
	}
	else if(packageType=="Gold"){
	
		if($("#checka").is(":checked")){
			cost="1000";
		$("#cost").text(cost);	
		}
		else{
			cost="1200";
			$("#cost").text(cost);
		}
	}
	else if(packageType=="Platinum"){
	if($("#checka").is(":checked")){
		cost="1200";
		$("#cost").text(cost);	
		}
		else{
			cost="1400";
			$("#cost").text(cost);
		}
	}
	else if(packageType=="Diamond"){
		if($("#checka").is(":checked")){
			cost="2000";
		$("#cost").text(cost);	
		}
		else{
			cost="2200";
			$("#cost").text(cost);
		}
	}
	
	
	return parseInt(cost)
	
}












  var selected=[];

var selectionLimit=setLimit($(".card-title").text());
			  $("div[class*='day']").on("click",function(event){
	
	if(selected.length<selectionLimit){
	
		if((selected.indexOf($(this).text())==-1) && (!$(this).hasClass("btn-primary"))){
				$(this).toggleClass("btn-secondary");
		$(this).toggleClass("btn-primary");
			selected.push($(this).text())
		}
		
		
	}
	else{
		if($(this).hasClass("btn-primary")){
			$(this).removeClass("btn-primary");
			$(this).addClass("btn-secondary");
			selected.splice(selected.indexOf($(this).text()), 1);
		}
		
	}
	

});

		  $("#rpayForm").submit(function(event){
			  event.preventDefault();
			 var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
} 
if (mm < 10) {
  mm = '0' + mm;
} 
var mybookingDate = dd + '/' + mm + '/' + yyyy;
if(selected.length==selectionLimit){
	var mycost=updateCost($(".card-title").text());
	var mycarType;
	if($("#check1").is(":checked")){
	mycarType="Hatchback/Sedan"	
	}
	else{
		mycarType="SUV/Compact SUV"	
	}
	var days="";
	selected.forEach(function(val,i){
		days+=val;
		if(i!=selected.length-1){
			days+=","
		}
	})
	var washcount=noOfWashes($(".card-title").text());
					 
	var data={ name : $("#hiddenName").text(),
			  package :$(".card-title").text(),
			  washCount:String(washcount),
			  bookedDays:days,
			  address : $("#address").val(),
			  cost : mycost,
			  carType : mycarType,
			  bookingDate :mybookingDate
			 } 
	
// 			   	fetch("/createOrder", {
//     method: 'POST', 

// headers: {'Content-Type': 'application/json','Accept': 'application/json'},

//     body: JSON.stringify(data)
//   }).then(function(resp){
// 	return resp.json()
// 	}).then(function(mydata){
// 		console.log(mydata)
// 					data["orderId"]=mydata;
// 					$("#key_id").value("");
// 					$("#order_id").value("");
// 					$("#description").value($("descr").text());
// 					$("#washlocation").value($("#address").value());
// 	})
			
	fetch("/placeorder", {
    method: 'POST', 

headers: {'Content-Type': 'application/json','Accept': 'application/json'},

    body: JSON.stringify(data)
   })
   
 //  .then(function(resp){
// 	return resp.json()
// 	}).then(function(data){
// 		window.location.href =data;
// 	})
}
			  else{
				  alert("Please select the number of slots specified")
				  return false
			  }
});