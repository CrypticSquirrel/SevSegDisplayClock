/**
 * Script for the timer.html page used to calculate time remaining
 */

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* ---------------------------- Global Variables ---------------------------- */

const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');
const display6 = document.getElementById('display-6');
const clockContainer = document.getElementById('clock-container');

// Counter and flag global variables
let isPaused = true;
let currentSeconds = 0;
let currentMinutes = 0;
let currentHours = 0;

let displaySeconds = true;
let displayHours = true;

/* ---------------------------- Helper Functions ---------------------------- */

const initializePageView = () => {
    const timeFormat = Cookies.get('clock-display');

    if (timeFormat === 'hh:mm') {
        $('#display-5').hide();
        $('#display-6').hide();
        clockContainer.style.width = '780px';
        displaySeconds = false;
    } else if (timeFormat === 'mm:ss') {
        $('#display-1').hide();
        $('#display-2').hide();
        clockContainer.style.width = '780px';
        displayHours = false;
    }
};

/**
 * Fills in any missing leading zeros.
 *
 * @param {number} string string representation of a unit of time
 */
function zeroFill(string) {
    let chars = string;
    for (let i = 0, l = 2 - chars.length; i < l; i += 1) {
        chars = `0${string}`;
    }
    return chars;
}

/* ---------------------------- DOM Manipulation ---------------------------- */

/**
 * Starts the timer and changes displays if the user enters valid numbers.
 */
function startTimer() {
    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;
    const seconds = document.getElementById('seconds').value;
    const regex = /^[0-6][0-9]?$/;

    if (hours.match(regex) && minutes.match(regex) && seconds.match(regex)) {
        currentSeconds = parseInt(seconds);
        currentMinutes = parseInt(minutes);
        currentHours = parseInt(hours);
        $('#timer-form').hide();
        $('#clock-container').show();
        $('#instructions').show();
        isPaused = false;
        initializePageView();
    } else {
        alert('Each input must be numbers and between 0-59!');
    }
}

/**
 * Calculates the time left and changes the css used for each number
 * placeholder element. Will also change page when timer is finished.
 */
function updateDisplays() {
    if (!isPaused) {
        currentSeconds -= 1;

        if (currentHours <= 0 && currentMinutes <= 0 && currentSeconds <= 0) {
            $('#timer-display').hide();
            $('#instructions').hide();
            $('#timer-finished').show();
            document.title = 'Timer Done!';
            const currentSound = Cookies.get('timer-sound-path');
            if (currentSound) {
                const audio = new Audio(`${currentSound}`);
                audio.play();
            }
            isPaused = true;
        } else {
            if (currentSeconds < 0) {
                currentSeconds = 59;
                currentMinutes -= 1;
            }
            if (currentMinutes < 0) {
                currentMinutes = 59;
                currentHours -= 1;
            }

            const secondsDisplay = zeroFill(currentSeconds.toString());
            const minutesDisplay = zeroFill(currentMinutes.toString());
            const hoursDisplay = zeroFill(currentHours.toString());

            fetch('/time', {
                method: 'POST',
                body: JSON.stringify({
                    hours: hoursDisplay,
                    minutes: minutesDisplay,
                    seconds: secondsDisplay,
                    isHoursDisplayed: displayHours,
                    isRegularFormat: 'false',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (displayHours && !displaySeconds) {
                document.title = `${hoursDisplay}:${minutesDisplay}`;
            } else {
                document.title = `${minutesDisplay}:${secondsDisplay}`;
            }

            const baseClass = 'col clock-box display-no-';

            if (displayHours) {
                display1.className = baseClass + hoursDisplay[0];
                display2.className = baseClass + hoursDisplay[1];
            }
            display3.className = baseClass + minutesDisplay[0];
            display4.className = baseClass + minutesDisplay[1];
            if (displaySeconds) {
                display5.className = baseClass + secondsDisplay[0];
                display6.className = baseClass + secondsDisplay[1];
            }
        }
    }
}

/**
 * Tracks spacebar input and changes flag accordingly.
 */
window.addEventListener('keypress', function(event) {
    const keyCode = event.which || event.keyCode;

    if (keyCode === 32) {
        event.preventDefault();
        isPaused = !isPaused;
        document.title = 'Timer Paused!';
    }
});

window.setInterval(updateDisplays, 1000);
