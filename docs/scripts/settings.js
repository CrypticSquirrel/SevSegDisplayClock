/**
 * Script for the settings.html page used to change the settings for the seven segment display
 */

/* eslint-disable indent */
/* eslint-disable no-undef */

let currentSound;

/* ---------------------------- Helper Functions ---------------------------- */

const setSound = () => {
    switch (currentSound) {
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

/* ---------------------------- JQuery Selectors ---------------------------- */

$(document).ready(() => {
    const soundName = Cookies.get('timer-sound-name');
    currentSound = Cookies.get('timer-sound-path');
    $('#timer-sound').val(`${soundName}`);

    $('#save').click(() => {
        const military = $('#military-time').val();
        Cookies.set('military-time', `${military}`);
        const clock = $('#clock-display').val();
        Cookies.set('clock-display', `${clock}`);
        const stopwatch = $('#stopwatch-display').val();
        Cookies.set('stopwatch-display', `${stopwatch}`);
        currentSound = $('#timer-sound').val();
        Cookies.set('timer-sound-name', `${currentSound}`);
        currentSound = setSound();
        Cookies.set('timer-sound-path', `${currentSound}`);
    });
    $('#sound-test').click(() => {
        if (currentSound) {
            const audio = new Audio(`${currentSound}`);
            audio.play();
        }
    });
});
