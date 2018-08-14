var display = document.querySelector("#workDisplay");
var breakDisplay = document.querySelector("#breakDisplay");
var workDiv = document.querySelector(".work");
var breakDiv = document.querySelector(".break");
var start = document.querySelector("#start");
var stop = document.querySelector("#stop");
var reset = document.querySelector("#reset");
var forms = document.querySelectorAll(".form-control");

var count = 0;
var timeleft = 1500;
var t;
var on = false;

var brCount = 0;
var breakTimeleft = 1500;
var bt;
var brOn = false;

var alarmSound = document.querySelector("audio");

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
			if (count === timeleft) {
				alarmSound.play();
				count = 0;
				timeleft = forms[0].value * 60;
				clearInterval(t);
				on = false;
				display.innerHTML = "00:00";
				workDiv.classList.toggle("hidden");
				breakDiv.classList.toggle("hidden");
			} else {
				display.innerHTML = convertSeconds(timeleft - count);
			}
		}, 1000);
	} on = false;
}

function breakTimer() {
	if (!brOn) {
		bt = setInterval(function(){
			brCount++;
			on = true;
			if (brCount === breakTimeleft) {
				//alarmSound.play();
				brCount = 0;
				breakTimeleft = forms[1].value * 60;
				clearInterval(bt);
				brOn = false;
				breakDisplay.innerHTML = "00:00";
				workDiv.classList.toggle("hidden");
				breakDiv.classList.toggle("hidden");
			} else {
				breakDisplay.innerHTML = convertSeconds(breakTimeleft - brCount);
			}
		}, 1000);
	} brOn = false;
}

start.addEventListener("click", function(){
	if (!workDiv.classList.contains("hidden")) {
		timer();
	}
	if (!breakDiv.classList.contains("hidden")) {
		breakTimer();
	}	
});

stop.addEventListener("click", function(){
	if (!workDiv.classList.contains("hidden")) {
		clearInterval(t);
		on = false;
	}
	if (!breakDiv.classList.contains("hidden")) {
		clearInterval(bt);
		brOn = false;
	}	
});

reset.addEventListener("click", function(){
	if (!workDiv.classList.contains("hidden")) {
		clearInterval(t);
		timeleft = forms[0].value * 60;
		count = 0;
		display.innerHTML = convertSeconds(timeleft - count);	
	}
	if (!breakDiv.classList.contains("hidden")) {
		clearInterval(bt);
		timeleft = forms[1].value * 60;
		brCount = 0;
		breakDisplay.innerHTML = convertSeconds(breakTimeleft - brCount);
	}
});

forms[0].addEventListener("change", function(){
	if(Number(this.value)) {
		clearInterval(t);
		count = 0;
		display.innerHTML = digit2(this.value) + ":" + "00";
		timeleft = this.value * 60;
	} else {
		alert("Type a valid number");
	}
});

forms[0].addEventListener("click", function(){
	if (workDiv.classList.contains("hidden")) {
		workDiv.classList.toggle("hidden");
		breakDiv.classList.toggle("hidden");
	}
});

forms[1].addEventListener("click", function(){
	if (breakDiv.classList.contains("hidden")) {
		workDiv.classList.toggle("hidden");
		breakDiv.classList.toggle("hidden");
	}
});

forms[1].addEventListener("change", function(){
	if(Number(this.value)) {
		clearInterval(bt);
		breakCount = 0;
		breakDisplay.innerHTML = digit2(this.value) + ":" + "00";
		breakTimeleft = this.value * 60;
	} else {
		alert("Type a valid number");
	}
}); 
