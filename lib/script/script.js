var display = document.querySelector("#display");
var start = document.querySelector("#start");
var stop = document.querySelector("#stop");
var reset = document.querySelector("#reset");
var forms = document.querySelectorAll(".form-control")
var count = 0;
var timeleft = 1500;
var t;
var on = false;


function digit2(number) {
   return (number < 10 ? '0' : '') + number
}

function convertSeconds(s) {
	var min = Math.floor(s / 60);
	var sec = s % 60;
	return digit2(min) + ":" + digit2(sec);
}

function timer() {
if (!on) {
	t = setInterval(function(){
		count++;
		on = true;
		display.innerHTML = convertSeconds(timeleft - count);
	}, 1000);
} on = false;
}

start.addEventListener("click", timer);

stop.addEventListener("click", function(){
	clearInterval(t);
	on = false;
});

reset.addEventListener("click", function(){
	clearInterval(t);
	count = 0;
	display.innerHTML = convertSeconds(timeleft - count);	
});

forms[0].addEventListener("change", function(){
	if(Number(this.value)) {
		display.innerHTML = this.value + ":" + "00";
		timeleft = this.value * 60;
	} else {
		alert("Type a valid number");
	}
});

forms[1].addEventListener("click", function(){
	alert("clicked2");
});
