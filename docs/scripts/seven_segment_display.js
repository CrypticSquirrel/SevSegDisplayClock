const display1 = document.getElementById('display-1');
const display2 = document.getElementById('display-2');
const display3 = document.getElementById('display-3');
const display4 = document.getElementById('display-4');
const display5 = document.getElementById('display-5');
const display6 = document.getElementById('display-6');

function zeroFill(string, length) {
  let chars = string;
  for (let i = 0, l = length - chars.length; i < l; i += 1) {
    chars = `0${string}`;
  }
  console.log(string);
  return string;
}

/**
 * IDEA: Function to remove hours or seconds.
 *    1. Select #displays 1,2 -> display:none;
 *    2. Select #clock-container -> width: ~ 700px;
 */

function updateDisplays() {
  const d = new Date();
  const h = zeroFill(d.getHours().toString(), 2);
  const m = zeroFill(d.getMinutes().toString(), 2);
  const s = zeroFill(d.getSeconds().toString(), 2);

  const baseClass = 'col clock-box display-no-';

  display1.className = baseClass + h[0];
  display2.className = baseClass + h[1];
  display3.className = baseClass + m[0];
  display4.className = baseClass + m[1];
  display5.className = baseClass + s[0];
  display6.className = baseClass + s[1];
}

setInterval(updateDisplays, 1000);
updateDisplays();
