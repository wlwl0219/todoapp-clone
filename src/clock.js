const curTime = document.querySelector(".js-timecurr");
Number.prototype.padLeft = function () {
    if (this < 10) {
        return "0" + String(this);
    } else {
        return String(this);
    }
}

function getCurrTime() {
    const currDay = new Date();
    const hour = currDay.getHours().padLeft();
    const min = currDay.getMinutes().padLeft();
    curTime.textContent = `${hour} : ${min}`;
}

function init() {
    getCurrTime();
    setInterval(getCurrTime, 1000);
}
init();