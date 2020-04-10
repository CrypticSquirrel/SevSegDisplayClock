# Arduino 7 Segment Display Clock 

This is the codebase (built on top of platform.io) for the 7 segment display project for microprocessors. This README will be updated as progress is made on the project.

##### --- [Demo Site](https://crypticsquirrel.github.io/SevSegDisplayClock/) ---

### Progress

- Boilerplate code has been added. Logic to keep track of time by using the millis() function.
- Waiting on 7 segment display part
- Got node.js to successfully blink an LED 
- Boilerplate design and node web server added 

### Developer Documentation

First you will need Node/Express to run the server
- Clone the repository
- Install Node.js
- If you are using MacOS you can use brew to install node:
``` 
brew install node
```
- Once you have node you can install all relevant dependencies (while in repository root):
``` 
npm install
```
- Now you can run the server with node or nodemon from the command line
``` 
nodemon server.js
```
