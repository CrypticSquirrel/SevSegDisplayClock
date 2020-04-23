# Project Setup

This project uses Node and Express. Clone it locally and run `npm install` in the root repository. If you do not have node yet, read the [node.js documentation](https://nodejs.org/en/docs/) first. 

# Hardware Setup

See [Report.md](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/documentation/Report.md) for wiring and pin information. 

Upload the firmata protocol to your arduino board. See [documentation here](https://www.instructables.com/id/Arduino-Installing-Standard-Firmata/) on how to do that if you are unsure.

# Code Explanation 

### Server-Side Javascript 

Our [main.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/main.js) is like our middleman between the arduino and website. To interface to the arduino we use johnny-five and to interface with the web we use node.js. Our application will serve our static website files when a client visits our website. It will then connect with the arduino and listen for post requests on specific routes from the clientside javascript. 

### Client-Side Javascript 

The [time_display.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/time_display.js) file gets the time from the user with the Date() object and changes the display of the seven segment display on the website based on that time. To do this to selects each single digit display from `display-[1-6]` and changes the class name `display-no-[0-9]`. This will change the css to 10 predefined styles for each number. It will also send a POST request with the current seconds, minutes, and hours. This change happens every second.

The [stopwatch.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/stopwatch.js) and [timer.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/timer.js) files work similarly. They add some extra logic to listen for user input to stop/start the timer/stopwatch. The timer also has a user input to pick the length of time.

The [custom.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/custom.js) file sends a POST request to the server to reset the display on the 7 segment display. It will then listen whenever a user clicks on a segment on the website. It will then send a POST request to the server with information on the specific segment and index clicked.

The [settings.js](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/scripts/settings.js) initializes the settings page from any cookies the user might have if they had selected something beforehand (this will remember any options between sessions). It also has 2 click handers that initialize the cookies and play the sound saved in the cookies respectively.

### HTML

Each [html page](https://github.com/CrypticSquirrel/SevSegDisplayClock/tree/master/docs/pages) corresponds to a javascript file with the same name. It lays out the structure of each page and holds placeholders that we can style in css and reference in js. The [index.html](https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/master/docs/index.html) is our homepage. Each html page contains the same header so you can easily navigate through the different pages.

### CSS & Bootstrap

Our [CSS files](https://github.com/CrypticSquirrel/SevSegDisplayClock/tree/master/docs/resources) contain custom styles for our pages including the digital seven segment display. We utilize bootstrap in order to help with positioning and certain elements. 
 
