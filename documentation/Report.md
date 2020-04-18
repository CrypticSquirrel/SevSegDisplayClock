# Introduction

From the beginning of this class, we took a journey learning about architecture of the modern computer. From electrons and LEDs to 
machine code and assembly we made our way to modern programming languages like C. This project tries to encapsulate important lessons 
we learned along the way while trying to tie it to the ever evolving tech world we live in now. In this project we’ll take LED displays, 
wire it to an arduino, and then transition from C to Javascript in our own hosted web server. A user will be able to interface with the arduino and LED displays from a website that will act as a clock, timer, or stopwatch.

# Hardware

The hardware we use in this project includes wires, 4 resistors, a ZS-042 DS3231 RTC module, an Arduino Pro Micro, a breadboard, 
and a 4 digit seven segment display. The seven segment display we’re using is a common cathode display. Wiring the device simply required attaching the pins of the display to their own port, and correctly setting up the real time clock module. 

<img src="https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/develop/documentation/pics/clock.jpg" width="500">

In order to have a clear idea of which lights on the segment display are connected to which ports, we created this graphic 
that shows all the relevant information. The D1, D2, D3, and D4 pins on the segment display need to be run through resistors 
before connecting to the arduino. 

<img src="https://github.com/CrypticSquirrel/SevSegDisplayClock/blob/develop/documentation/pics/pin-info.png" width="500">

# Node.js Integration

Since our goal was to integrate our arduino with a web page, we decided to use node.js for our backend. Node.js is a Javascript 
runtime environment that will execute server-side code. Using node.js we will allow us to build and deploy a network application 
quickly and easily.

In order for node.js to be able to communicate with our microcontroller, we will be utilizing the [firmata protocol](https://github.com/firmata/protocol). 
We will load the arduino specific firmata on our pro micro arduino’s firmware. This will essentially allow another programming language, 
like node.js, to communicate with the arduino. The firmata will send and receive data using a midi-like message format between the 
Arduino device and the software running on the host computer. The [API documentation](https://firmata.github.io/arduino/html/index.html) 
lists several functions that can be used to communicate with the arduino. 

In order to not have to write integration between node.js and the firmata framework we will be utilizing a javascript framework called 
[johnny-five](http://johnny-five.io/). This framework will handle the communication between our node application and the firmata framework
that will be loaded unto our arduino board. We will be using the [johnny-five API](http://johnny-five.io/api/) when coding our node application.

# Web Server

Once we have our integration set up, we can start constructing a web server. In order to do this, we will be utilizing a middleware web framework called Express.js. This framework allows our node.js application to handle multiple different http requests at specific URLSs. The handling of these requests are commonly referred to as routes. These routes are managed by middleware defined by Express. Middleware is any number of functions that are invoked by the Express routing layer before your final request handler is, and thus sits in the middle between a raw request and the final intended route. We will be using Express to serve static HTML pages to our client (computer connecting to the website) like our “index.html” file or “clock.html.” Any files specified by our HTML pages will also get loaded like photos, javascript files, and css files.

Our node.js framework will define a johnny-five board to control our arduino and an Express application to start building our own custom routes. Once our board is ready, we will define several routes that will get handled based on which html page the user is on or which custom js function is run. We will use the johnny-five api to read/write to pins from our arduino board based on what route we are handling. As stated before these routes will act as middleware and handle the integration between the arduino and user interface. Any additional needed logic will be defined outside the routes as helper functions. 

# User Interface

The user interface is built using html, css, and javascript. We utilize the bootstrap framework to make designing our website easier/faster. The bootstrap framework is a giant collection of handy, reusable bits of code written in HTML, CSS, and JavaScript. This allows us to spend less time designing our website and more time focusing on custom client-side programming and routing. We pull this code straight from the web using bootstrapcdn. A quick thing to note is that in order to use bootstrap we need to load the jquery library as a dependency. 

There are three essential pages that include a clock, a timer, and a stopwatch. Each of these pages has custom javascript that communicates with our web server through various routes. Based on the user’s current state (like timezone their IP is from) and actions they perform (like clicking a button), javascript will get executed to alter the page and/or the arduino.

# Conclusion

This project takes lessons we learned in microprocessor systems and branches out to the world of modern web development. Just like in class, we utilized several frameworks to keep abstracting away certain components of our hardware and application. Through these layers of abstraction, we were able to integrate our arduino with a website. A user on this website would be able to control the output of our seven segment displays both directly and indirectly. We showed several applications of I/O while using our timer, stopwatch, and clock web apps.  This project taught us a lot and reinforced the concepts we had studied in class. The practical skills we gained from this project will no doubt help us in the future.

