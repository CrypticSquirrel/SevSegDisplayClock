/**
 * Express web server that handles integration between an arduino and
 * a website by defining routes while using johnny-five's API.
 */

/* ------------------------------ Dependencies ------------------------------ */
const express = require('express');
const { Board, Led } = require('johnny-five');
const bodyParser = require('body-parser');

/* ---------------------------- Global Variables ---------------------------- */
const app = express();
const board = new Board();
let digits;

/* ----------------------------- Initialization ----------------------------- */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => console.log('listening at http://localhost:3000/'));
app.use(express.static('docs'));

/* ---------------------------- Routing ---------------------------- */

/**
 * Route that gets the time from the client-side javascript to the 7-segment display.
 */
app.post('/time', (req, res) => {
    if (req.body.isHoursDisplayed === true) {
        if (req.body.isRegularFormat === 'true') {
            const regHours = parseInt(req.body.hours) % 12;
            digits.print(`${regHours}:${req.body.minutes}`);
        } else {
            digits.print(`${req.body.hours}:${req.body.minutes}`);
        }
    } else {
        digits.print(`${req.body.minutes}:${req.body.seconds}`);
    }
    res.status(200);
    res.end();
});

/**
 * Route to reset 7-segment display.
 */
app.post('/reset', () => {
    digits.clear();
});

/* ----------------------------- Arduino Initialization ---------------------------- */

function startServer() {
    app.listen('5000', () => {
        console.log('App listening on port 5000');
    });
    digits = new Led.Digits({
        controller: 'HT16K33',
    });
}

board.on('ready', startServer);
