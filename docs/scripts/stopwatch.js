/**
 * Script for the stopwatch.html page used to calculate time passed
 */

/* eslint-disable no-undef */

/* ---------------------------- Global Variables ---------------------------- */

const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');
const clockContainer = document.getElementById('clock-container');

// Counter and flag global variables
let isPaused = true;
let currentMillis = 0;
let currentSeconds = 0;
let currentMinutes = 0;
let displayMillis = true;

/* ---------------------------- Helper Functions ---------------------------- */

const initializePageView = () => {
    const timeFormat = Cookies.get('stopwatch-display');
    if (timeFormat === 'mm:ss') {
        $('#display-5').hide();
        clockContainer.style.width = '780px';
        displayMillis = false;
    }
};

/**
 * Fills in any missing leading zeros.
 *
 * @param {number} string string representation of a unit of time
 */
function zeroFill(string) {
    let unitOfTime = string;
    for (let i = 0, l = 2 - unitOfTime.length; i < l; i += 1) {
        unitOfTime = `0${string}`;
    }
    return unitOfTime;
}

/* ---------------------------- DOM Manipulation ---------------------------- */

/**
 * Calculates time past and changes display on the html page with by changing
 * the css used for each number placeholder element.
 */
function updateDisplays() {
    if (!isPaused) {
        currentMillis += 10;
        if (currentMillis > 99) {
            currentSeconds += 1;
            currentMillis = 0;
        }

        if (currentSeconds > 59) {
            currentSeconds = 0;
            currentMinutes += 1;
        }
        if (currentMinutes > 60) {
            currentMinutes = 0;
        }

        const millisDisplay = zeroFill(currentMillis.toString());
        const secondsDisplay = zeroFill(currentSeconds.toString());
        const minutesDisplay = zeroFill(currentMinutes.toString());

        fetch('/time', {
            method: 'POST',
            body: JSON.stringify({
                millis: millisDisplay,
                minutes: minutesDisplay,
                seconds: secondsDisplay,
                isHoursDisplayed: 'false',
                isRegularFormat: 'false',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        document.title = `${minutesDisplay}:${secondsDisplay}`;

        const baseClass = 'col clock-box display-no-';

        display1.className = baseClass + minutesDisplay[0];
        display2.className = baseClass + minutesDisplay[1];
        display3.className = baseClass + secondsDisplay[0];
        display4.className = baseClass + secondsDisplay[1];
        if (displayMillis) {
            display5.className = baseClass + millisDisplay[0];
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
        document.title = 'Stopwatch Paused!';
    }
});

initializePageView();
window.setInterval(updateDisplays, 100);
