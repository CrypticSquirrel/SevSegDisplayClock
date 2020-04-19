/* eslint-disable no-undef */

$(document).ready(() => {
    $('#save').click(() => {
        const military = $('#military-time').val();
        Cookies.set('military-time', `${military}`);
        const clock = $('#clock-display').val();
        Cookies.set('clock-display', `${clock}`);
        const stopwatch = $('#stopwatch-display').val();
        Cookies.set('stopwatch-display', `${stopwatch}`);
        const sound = $('#alarm-sound').val();
        Cookies.set('alarm-sound', `${sound}`);
    });
    $('#sound-test').click(() => {
        // TODO: Add sound
    });
});
