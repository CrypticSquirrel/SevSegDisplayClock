const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');
const display6 = document.getElementById('display-6');

function zeroFill(string) {
    let chars = string;
    for (let i = 0, l = 2 - chars.length; i < l; i += 1) {
        chars = `0${string}`;
    }
    return chars;
}

function updateDisplays() {
    const d = new Date();
    const m = zeroFill(d.getMinutes().toString());
    const s = zeroFill(d.getSeconds().toString());
    const mi = zeroFill(d.getMilliseconds().toString());

    document.title = `${m}:${s}`;

    const baseClass = 'col clock-box display-no-';

    display1.className = baseClass + m[0];
    display2.className = baseClass + m[1];
    display3.className = baseClass + s[0];
    display4.className = baseClass + s[1];
    display5.className = baseClass + mi[0];
    display6.className = baseClass + mi[1];
}

let count = 30;

function timer() {
    count -= 1;
    if (count <= 0) {
        clearInterval(counter);
        // counter ended, do something here
    }

    // Do code for showing the number of seconds here
}
const counter = setInterval(timer, 1000); // 1000 will run it every 1 second
