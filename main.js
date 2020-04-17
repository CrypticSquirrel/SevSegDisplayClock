/**
 * Express web server that handles integration between an arduino and
 * a website by defining routes and using johnny-five's API.
 */

// Dependencies
const express = require('express');
const five = require('johnny-five');
const bodyParser = require('body-parser');

// Global variables
const app = express();
const board = new five.Board();

// Pins represent: A B C D E F G
const segmentLEDs = new five.Leds([2, 3, 4, 5, 12, 13, 21]);
// Left to Right
const digitPins = new five.Leds([7, 8, 10, 11]);

// Each LED group represents a number 0-9
const SevenSegNumbers = [
    new five.Leds([2, 3, 4, 5, 12]),
    new five.Leds([3, 4]),
    new five.Leds([2, 3, 5, 21]),
    new five.Leds([2, 3, 4, 5, 21]),
    new five.Leds([3, 4, 13, 21]),
    new five.Leds([2, 4, 5, 13, 21]),
    new five.Leds([2, 4, 5, 12, 13, 21]),
    new five.Leds([2, 3, 4]),
    new five.Leds([2, 3, 4, 5, 12, 13, 21]),
    new five.Leds([2, 3, 4, 5, 13, 21]),
];

// Needed to parse json for POST routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

board.on('ready', function() {
    // Launches website
    app.listen(3000, () => console.log('listening at http://localhost:3000/'));
    app.use(express.static('docs'));

    /**
     * Route that gets the time from the client-side javascript.
     */
    app.post('/time', (req, res) => {
        const firstDigit = req.body.minutes[0];
        const secondDigit = req.body.minutes[1];
        const thirdDigit = req.body.seconds[0];
        const fourthDigit = req.body.seconds[1];

        // TODO: Move this all to it's own function w/ documenation

        // reset
        digitPins.forEach(item => {
            item.on();
            segmentLEDs.off();
            item.off();
        });

        // write
        digitPins[0].on();
        SevenSegNumbers[firstDigit].on();
        digitPins[0].off();
        digitPins[1].on();
        SevenSegNumbers[secondDigit].on();
        digitPins[1].off();
        digitPins[2].on();
        SevenSegNumbers[thirdDigit].on();
        digitPins[2].off();
        digitPins[3].on();
        SevenSegNumbers[fourthDigit].on();
        digitPins[3].off();
    });
});
