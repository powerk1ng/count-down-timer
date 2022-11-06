const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

const giveawayEnd = document.querySelector('.giveaway__subtitle');
const giveawayTimers = document.querySelectorAll('.giveaway__deadline span');
const deadLine = document.querySelector('.giveaway__deadline');


let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentHour = currentDate.getHours();
let currentDay = currentDate.getDate();

const SetFutureDate = new Date(currentYear, currentMonth + 1, currentDay + 25, currentHour, 35, 0);

let futureDate = new Date(SetFutureDate);

const year = futureDate.getFullYear();
let day = futureDate.getDate();
let hour = futureDate.getHours();
let minute = futureDate.getMinutes();
let second = futureDate.getSeconds();

let month = futureDate.getMonth();
month = monthsArr[month];

const weekday = weekdays[futureDate.getDay()-1];

hour = (hour < 10) ? '0' + hour : hour;
minute = (minute < 10) ? '0' + minute : minute;
second = (second < 10) ? '0' + second : second;

giveawayEnd.textContent = `Giveaway ends on ${weekday}, ${day} ${month} ${year}, ${hour}:${minute}`;

const futureTime = futureDate.getTime(); //milliseconds 1s = 1000ms


function getTimeLeft(){
    const currentDate = new Date().getTime();
    const t = futureTime - currentDate;


    //values in ms
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;
    

    let daysLeft = Math.floor(t/oneDay);
    let hoursLeft = Math.floor((t % oneDay / oneHour));
    let minutesLeft = Math.floor((t % oneHour / oneMinute));
    let secondsLeft = Math.floor((t % oneMinute / 1000));


    const timeValues = [daysLeft, hoursLeft, minutesLeft, secondsLeft];
    
    function formatTimers(item){
        if(item < 10){
            item = '0' + item;
        }
        return item;
    }   
   

    giveawayTimers.forEach(function(item, index){
        item.innerHTML = formatTimers(timeValues[index]);
    });

    if(t < 0){
        clearInterval(countdownTime);
        deadLine.innerHTML = `<h4 class="expired">sorry, giveaway has expired :(</h4>`;
    }
}

//countdown 
let countdownTime = setInterval(getTimeLeft, 1000);

getTimeLeft();