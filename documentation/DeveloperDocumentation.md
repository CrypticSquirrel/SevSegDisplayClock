# Project Setup

This project uses Node and Express. Clone it and run `npm install` in the root repository. If you do not have node yet, read the [node.js documentation](https://nodejs.org/en/docs/) first.

# Hardware Setup

See [Report.md](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/documentation/Report.md) for wiring and pin information. 

Upload the firmata protocol to your arduino board. See [documentation here](https://www.instructables.com/id/Arduino-Installing-Standard-Firmata/) on how to do that if you are unsure.

# Code Explanation 

Our [main.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/main.js) is like our middleman between the arduino and website. To interface to the arduino we use johnny-five and to interface with the web we use node.js. Our application will serve our static website files when a client visits our website. It will then connect with the arduino and listen for post requests on specific routes from the clientside javascript. 

The [time_display.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/time_display.js) file gets the time from the user with the Date() object and changes the display of the seven segment display on the website based on that time. To do this to selects each single digit display from `display-[1-6]` and changes the class name `display-no-[0-9]`. This will change the css to 10 predefined styles for each number. It will also send a POST request with the current seconds, minutes, and hours. This change happens every second.

The [stopwatch.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/stopwatch.js) and [timer.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/timer.js) files work similarly. They add some extra logic to listen for user input to stop/start the timer/stopwatch. The timer also has a user input to pick the length of time.

The [custom.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/custom.js) file sends a POST request to the server to reset the display on the 7 segment display. It will then listen whenever a user clicks on a segment on the website. It will then send a POST request to the server with information on the specific segment and index clicked.

TODO: [settings.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/settings.js) explanation
