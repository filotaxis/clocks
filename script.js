const clock = document.querySelector(".clock");

// digital watch
const dig_hr = document.querySelector(".dig-hr");
const dig_min = document.querySelector(".dig-min");
const dig_sec = document.querySelector(".dig-sec");

// analog clock
const hour_hand = document.querySelector(".hour");
const minute_hand = document.querySelector(".minute");
const second_hand = document.querySelector(".second");

// apple watch
const h_progress = document.querySelector(".apple-hr");
const m_progress = document.querySelector(".apple-min");
const s_progress = document.querySelector(".apple-sec");

const h_radius = h_progress.r.baseVal.value;
const m_radius = m_progress.r.baseVal.value;
const s_radius = s_progress.r.baseVal.value;

const h_circunference = h_radius * 2 * Math.PI;
const m_circunference = m_radius * 2 * Math.PI;
const s_circunference = s_radius * 2 * Math.PI;

h_progress.style.strokeDasharray = h_circunference;
m_progress.style.strokeDasharray = m_circunference;
s_progress.style.strokeDasharray = s_circunference;

// apple watch - make the strokes grow according the time
let setProgress = (time, progress, circunference, factor) => {
    progress.style.strokeDashoffset = circunference - (time / factor) * circunference;
}

let actual_time = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // a clock works with 12 hours
    if (hours === 12) {
        hours = 0;
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    
    //to normalize hour is divided by 12, sec and mins by 60
    setProgress(hours, h_progress, h_circunference, 12);
    setProgress(minutes, m_progress, m_circunference, 60);
    setProgress(seconds, s_progress, s_circunference, 60);
    
    // analog clock transformations
    const seconds_degrees = ((seconds / 60) * 360) + 90;
    second_hand.style.transform = `rotate(${seconds_degrees}deg)`;

    const mins_degrees = ((minutes / 60) * 360) + 90;
    minute_hand.style.transform = `rotate(${mins_degrees}deg)`;

    const hour_degrees = ((hours / 12) * 360) + 90;
    hour_hand.style.transform = `rotate(${hour_degrees}deg)`;

    //digital watch
    dig_hr.textContent =  `${(hours < 10) ? "0" + hours : hours}`;
    dig_min.textContent = `${(minutes < 10) ? "0" + minutes : minutes}`;
    dig_sec.textContent = `${(seconds < 10) ? "0" + seconds : seconds}`;
}

setInterval(actual_time, 1000);
actual_time();
