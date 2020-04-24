/**
 * Script for the clock.html page used to display time
 */

/* eslint-disable no-undef */

/* ---------------------------- Global Variables ---------------------------- */

const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');
const display6 = document.getElementById('display-6');
const clockContainer = document.getElementById('clock-container');
let regularTime;
let displaySeconds = true;
let displayHours = true;

/* ---------------------------- Helper Functions ---------------------------- */

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

const initializePageView = () => {
    regularTime = Cookies.get('regular-time') === 'true';
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

/* ---------------------------- DOM Manipulation ---------------------------- */

/**
 * Calculates the current time and changes the css used for each number
 * placeholder element.
 */
function updateDisplays() {
    const d = new Date();
    let h = zeroFill(d.getHours().toString());
    const m = zeroFill(d.getMinutes().toString());
    const s = zeroFill(d.getSeconds().toString());
    if (regularTime) {
        h = zeroFill((d.getHours() % 12).toString());
    }
    document.title = `${h}:${m}`;

    const baseClass = 'col clock-box display-no-';

    fetch('/time', {
        method: 'POST',
        body: JSON.stringify({
            hours: h,
            minutes: m,
            seconds: s,
            isHoursDisplayed: displayHours,
            isRegularFormat: regularTime,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });

    if (displayHours) {
        display1.className = baseClass + h[0];
        display2.className = baseClass + h[1];
    }
    display3.className = baseClass + m[0];
    display4.className = baseClass + m[1];
    if (displaySeconds) {
        display5.className = baseClass + s[0];
        display6.className = baseClass + s[1];
    }
}

initializePageView();
setInterval(updateDisplays, 1000);
