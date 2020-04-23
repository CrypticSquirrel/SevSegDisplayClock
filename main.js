/**
 * Express web server that handles integration between an arduino and
 * a website by defining routes while using johnny-five's API.
 */

/* ------------------------------ Dependencies ------------------------------ */
const express = require('express');
const five = require('johnny-five');
const bodyParser = require('body-parser');

/* ---------------------------- Global Variables ---------------------------- */
const app = express();
const board = new five.Board();
// 11 -> 16 12 -> 14 13 -> 15
// Pins represent: A B C D E F G
const segmentLEDs = new five.Leds([2, 3, 4, 5, 14, 15, 21]);
// Left to Right
const digitPins = new five.Leds([7, 8, 10, 16]);

// Each LED group represents a number 0-9
const SevenSegNumbers = [
    new five.Leds([2, 3, 4, 5, 14]),
    new five.Leds([3, 4]),
    new five.Leds([2, 3, 5, 21]),
    new five.Leds([2, 3, 4, 5, 21]),
    new five.Leds([3, 4, 13, 21]),
    new five.Leds([2, 4, 5, 13, 21]),
    new five.Leds([2, 4, 5, 14, 13, 21]),
    new five.Leds([2, 3, 4]),
    new five.Leds([2, 3, 4, 5, 14, 13, 21]),
    new five.Leds([2, 3, 4, 5, 13, 21]),
];

/* ----------------------------- Initialization ----------------------------- */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => console.log('listening at http://localhost:3000/'));
app.use(express.static('docs'));

/* ---------------------------- Helper Functions ---------------------------- */

const resetDisplay = () => {
    digitPins.forEach(item => {
        item.on();
        segmentLEDs.off();
        item.off();
    });
};

/* ----------------------------- Arduino Routing ---------------------------- */

board.on('ready', function() {
    /**
     * Route that gets the time from the client-side javascript to the 7-segment display.
     */
    app.post('/time', (req, res) => {
        let timeData;
        if (req.body.isHoursDisplayed === 'true') {
            timeData = [
                parseInt(req.body.hours[0]),
                parseInt(req.body.hours[1]),
                parseInt(req.body.minutes[0]),
                parseInt(req.body.minutes[1]),
            ];
        } else {
            timeData = [
                parseInt(req.body.minutes[0]),
                parseInt(req.body.minutes[1]),
                parseInt(req.body.seconds[0]),
                parseInt(req.body.seconds[1]),
            ];
        }
        if (req.body.isRegularFormat === 'true') {
            timeData.forEach((number, index) => {
                timeData[index] = number % 12;
            });
        }

        resetDisplay();
        timeData.forEach((number, index) => {
            digitPins[index].on();
            SevenSegNumbers[number].on();
            digitPins[index].off();
        });
    });

    /**
     * Route to reset 7-segment display.
     */
    app.post('/reset', () => {
        resetDisplay();
    });

    /**
     * Route to control each segment in the 7-segment display.
     */
    app.post('/sandbox', (req, res) => {
        const pinNumber = parseInt(req.body.number);
        const segment = parseInt(req.body.segment);
        digitPins[pinNumber].on();
        segmentLEDs[segment].toggle();
        digitPins[pinNumber].off();
    });
});
