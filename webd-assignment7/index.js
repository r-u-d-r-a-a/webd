$(document).ready(function() { 
          
    $( ".datePicker" ).datepicker();

    const currDate = new Date();

    const day = String(currDate.getDate()).padStart(2, '0');
    const month = String(currDate.getMonth() + 1).padStart(2, '0');
    const year = currDate.getFullYear();

    document.getElementById("datePicker").value = `${month}/${day}/${year}`;
}) 



const time_running = document.getElementById("time-running");
const start = document.getElementById("start");
const stopB = document.getElementById("stop");
const reset = document.getElementById("reset");

var intervalWorks;
var seconds = 0;
var ongoing = false;

var settingInterval = () => {
    return new Promise((resolve, reject)=>{
        resolve(setInterval(() => {
            seconds++;
            setTime();
        }, 1000))
    }
)}

async function startClock(){
    intervalWorks = await settingInterval();
    ongoing = true;
}


start.addEventListener("click", () => {
    if (!ongoing) {
        startClock();
    }
});


stopB.addEventListener("click", () => {
    if (ongoing) {
    clearInterval(intervalWorks);
    ongoing = false;
    }
});


reset.addEventListener("click", () => {
    clearInterval(intervalWorks);
    seconds = 0;
    setTime();
    ongoing = false;
});





var setTime = () => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secondsUp = String(seconds % 60).padStart(2, "0");
    time_running.textContent = `${hours}:${minutes}:${secondsUp}`;
}