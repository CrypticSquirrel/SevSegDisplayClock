/**
 * Script for the settings.html page used to change the settings for the seven segment display
 */

/* eslint-disable indent */
/* eslint-disable no-undef */

/* ---------------------------- Global Variables ---------------------------- */

let currentSoundPath;
let soundSelectVal;

/* ---------------------------- Helper Functions ---------------------------- */

const getSoundPath = () => {
    switch (soundSelectVal) {
        case 'alarm clock':
            return '../resources/sounds/alarm-clock.wav';
        case 'synth':
            return '../resources/sounds/synth.wav';
        case 'moo':
            return '../resources/sounds/moo.mp3';
        case 'dramatic':
            return '../resources/sounds/dramatic.wav';
        default:
            return '';
    }
};

const initializeFormValues = () => {
    const militaryCheck = Cookies.get('military-time');
    const clockSelectVal = Cookies.get('clock-display');
    const stopwatchSelectVal = Cookies.get('stopwatch-display');
    soundSelectVal = Cookies.get('timer-sound-val');
    currentSoundPath = Cookies.get('timer-sound-path');

    $('#military-time').prop('checked', militaryCheck === 'true');
    $('#clock-display').val(`${clockSelectVal}`);
    $('#stopwatch-display').val(`${stopwatchSelectVal}`);
    $('#timer-sound').val(`${soundSelectVal}`);
};

/* ---------------------------- JQuery Selectors ---------------------------- */

$(document).ready(() => {
    initializeFormValues();
    $('#save').click(() => {
        const military = $('#military-time').is(':checked');
        const clock = $('#clock-display').val();
        const stopwatch = $('#stopwatch-display').val();
        soundSelectVal = $('#timer-sound').val();
        currentSoundPath = getSoundPath();

        Cookies.set('military-time', `${military}`);
        Cookies.set('clock-display', `${clock}`);
        Cookies.set('stopwatch-display', `${stopwatch}`);
        Cookies.set('timer-sound-val', `${soundSelectVal}`);
        Cookies.set('timer-sound-path', `${currentSoundPath}`);
    });
    $('#sound-test').click(() => {
        if (currentSoundPath) {
            const audio = new Audio(`${currentSoundPath}`);
            audio.play();
        }
    });
});
