const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');

let isPaused = true;
let currentMillis = 0;
let currentSeconds = 0;
let currentMinutes = 0;

function zeroFill(string) {
    let chars = string;
    for (let i = 0, l = 2 - chars.length; i < l; i += 1) {
        chars = `0${string}`;
    }
    return chars;
}

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

        const displayMillis = zeroFill(currentMillis.toString());
        const displaySeconds = zeroFill(currentSeconds.toString());
        const displayMinutes = zeroFill(currentMinutes.toString());

        document.title = `${displayMinutes}:${displaySeconds}`;

        const baseClass = 'col clock-box display-no-';

        display1.className = baseClass + displayMinutes[0];
        display2.className = baseClass + displayMinutes[1];
        display3.className = baseClass + displaySeconds[0];
        display4.className = baseClass + displaySeconds[1];
        display5.className = baseClass + displayMillis[0];
    }
}

window.setInterval(updateDisplays, 100);

window.addEventListener('keypress', function(event) {
    const keyCode = event.which || event.keyCode;

    if (keyCode === 32) {
        event.preventDefault();
        isPaused = !isPaused;
        document.title = 'Stopwatch Paused!';
    }
});
