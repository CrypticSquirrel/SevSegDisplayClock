/**
 * Script for the settings.html page used to change the settings for the seven segment display
 */

/* eslint-disable indent */
/* eslint-disable no-undef */

let sound;

/* ---------------------------- Helper Functions ---------------------------- */

const setSound = () => {
    switch (sound) {
        case 'alarm clock':
            return '../resources/sounds/alarm-clock.wav';
        case 'synth':
            return '../resources/sounds/synth.wav';
        case 'moo':
            return '../resources/sounds/moo.mp3';
        case 'dramatic':
            return '../resources/sounds/dramatic.wav';
        default:
            return 'houston we have a problem';
    }
};

/* ---------------------------- JQuery Selectors ---------------------------- */

$(document).ready(() => {
    $('#save').click(() => {
        const military = $('#military-time').val();
        Cookies.set('military-time', `${military}`);
        const clock = $('#clock-display').val();
        Cookies.set('clock-display', `${clock}`);
        const stopwatch = $('#stopwatch-display').val();
        Cookies.set('stopwatch-display', `${stopwatch}`);
        sound = $('#alarm-sound').val();
        sound = setSound();
        Cookies.set('alarm-sound', `${sound}`);
    });
    $('#sound-test').click(() => {
        const audio = new Audio(`${sound}`);
        audio.play();
    });
});
