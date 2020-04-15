/**
 * Script for the clock.html page used to display time
 */

// Element that contains each number placeholder starting from the left of the page
const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');
const display6 = document.getElementById('display-6');

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

/**
 * Calculates the current time and changes the css used for each number
 * placeholder element.
 */
function updateDisplays() {
    const d = new Date();
    const h = zeroFill(d.getHours().toString());
    const m = zeroFill(d.getMinutes().toString());
    const s = zeroFill(d.getSeconds().toString());

    document.title = `${h}:${m}`;

    const baseClass = 'col clock-box display-no-';

    display1.className = baseClass + h[0];
    display2.className = baseClass + h[1];
    display3.className = baseClass + m[0];
    display4.className = baseClass + m[1];
    display5.className = baseClass + s[0];
    display6.className = baseClass + s[1];
}

// Runs the updateDisplays function every second
setInterval(updateDisplays, 1000);
