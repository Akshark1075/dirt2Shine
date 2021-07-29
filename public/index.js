$("#icondiv").hide();
$(".addBtn").click(function(event){
	 $(this).toggleClass('rotated');
	$('.addBtn').toggleClass('active');
	$('.addBtn').toggleClass('inactive');
	setTimeout(function(){ $('#icondiv').toggle(); }, 500);

	 event.stopPropagation();
 });

//bubbly button
var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {

  bubblyButtons[i].addEventListener('click', animateButton, false);
}

setTimeout(function(){$(".alert").css("display","none");
}, 6000);
updateCost($("#silver").text());
updateCost($("#gold").text());
updateCost($("#platinum").text());
updateCost($("#diamond").text());
function updateCost(packageType){
	var cost;
	if(packageType=="Silver"){
		if($("#check1").is(":checked")){
			 cost="800";
		$("#silvercost").text(cost);	
			
		}
		else{
			cost="1000";
			$("#silvercost").text(cost);
		}
		
	}
	else if(packageType=="Gold"){
	
		if($("#check3").is(":checked")){
			cost="1000";
		$("#goldcost").text(cost);	
		}
		else{
			cost="1200";
			$("#goldcost").text(cost);
		}
	}
	else if(packageType=="Platinum"){
	if($("#check5").is(":checked")){
		cost="1200";
		$("#platinumcost").text(cost);	
		}
		else{
			cost="1400";
			$("#platinumcost").text(cost);
		}
	}
	else if(packageType=="Diamond"){
		if($("#check7").is(":checked")){
			cost="1400";
		$("#diamondcost").text(cost);	
		}
		else{
			cost="1600";
			$("#diamondcost").text(cost);
		}
	}
	
	
	return parseInt(cost)
	
}
$("#check1").on("change",function(event){
	if($("#check1").is(":checked")){
	
		$("#check2"). prop("checked", false);
	}
	else{
	
		$("#check2"). prop("checked", true);	
	}
	updateCost($("#silver").text());
});
$("#check2").on("change",function(event){
if($("#check2").is(":checked")){
	
		$("#check1"). prop("checked", false);
	}
	else{
	
		$("#check1"). prop("checked", true);	
	}
		updateCost($("#silver").text());
});

$("#check3").on("change",function(event){
	if($("#check3").is(":checked")){
	
		$("#check4"). prop("checked", false);
	}
	else{
	
		$("#check4"). prop("checked", true);	
	}
	updateCost($("#gold").text());
});
$("#check4").on("change",function(event){
if($("#check4").is(":checked")){
	
		$("#check3"). prop("checked", false);
	}
	else{
	
		$("#check3"). prop("checked", true);	
	}
		updateCost($("#gold").text());
});
$("#check5").on("change",function(event){
	if($("#check5").is(":checked")){
	
		$("#check6"). prop("checked", false);
	}
	else{
	
		$("#check6"). prop("checked", true);	
	}
	updateCost($("#platinum").text());
});
$("#check6").on("change",function(event){
if($("#check6").is(":checked")){
	
		$("#check5"). prop("checked", false);
	}
	else{
	
		$("#check5"). prop("checked", true);	
	}
		updateCost($("#platinum").text());
});

$("#check7").on("change",function(event){
	if($("#check7").is(":checked")){
	
		$("#check8"). prop("checked", false);
	}
	else{
	
		$("#check8"). prop("checked", true);	
	}
	updateCost($("#diamond").text());
});
$("#check8").on("change",function(event){
if($("#check8").is(":checked")){
	
		$("#check7"). prop("checked", false);
	}
	else{
	
		$("#check7"). prop("checked", true);	
	}
		updateCost($("#diamond").text());
});
