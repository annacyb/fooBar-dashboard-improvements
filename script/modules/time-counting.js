import dayjs from "dayjs";
import { get_orders } from "./api.js";

async function getCurrentTime() {
    let ordersData = await get_orders();
    let timestamp = ordersData.timestamp;

    let time = dayjs(timestamp);

    showTimeOnPage(time.format("HH:mm:ss"));

    showTimeTillClosing(ordersData, time);
}

function showTimeOnPage(time) {
    const timePlaces = document.querySelectorAll(".current-time-place");
    let timePlacesArray = [...timePlaces];

    timePlacesArray.forEach((element) => {
        element.innerHTML = "";
        element.innerHTML = time;
    });
}

function changeTimestampToTime(timestamp) {
    let time = dayjs(timestamp);
    time = time.format("HH:mm:ss");
    return time;
}

function changeTimestampToHour(timestamp) {
    let hour = dayjs(timestamp);
    hour = hour.format("HH");
    return hour;
}

function showTimeTillClosing(ordersData, currentTime) {
    // get closing time from database (it is only hour not timestamp)
    const closingHour = ordersData.bar.closingTime;
    const dateNow = dayjs().format("MM-DD-YYYY");

    const closingTime = dayjs(
        `${dateNow} ${closingHour}`,
        "MM-DD-YYYY H:mm:SS"
    ); // library works with USA date system

    // calculating inspired by:
    // https://stackoverflow.com/questions/24936855/get-time-difference-in-hours-minutes-and-seconds

    let diff = closingTime.diff(currentTime, "second");
    let hoursLeft = Math.floor(diff / 3600);
    let minuteLeft = Math.floor((diff - hoursLeft * 3600) / 60);
    let secondsLeft = Math.floor(diff - hoursLeft * 3600 - minuteLeft * 60);

    // show time till closing in HTML
    const hoursLeftPlace = document.getElementById("closingHour");
    const minutesLeftPlace = document.getElementById("closingMinutes");

    hoursLeftPlace.innerHTML = "";
    hoursLeftPlace.innerHTML = hoursLeft;

    minutesLeftPlace.innerHTML = "";
    minutesLeftPlace.innerHTML = minuteLeft;
}

setInterval(getCurrentTime, 1000);

export { changeTimestampToTime };

export { changeTimestampToHour };
