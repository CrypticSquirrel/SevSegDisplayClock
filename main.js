// Dependencies
const express = require('express');
//const johnny_five=require("johnny-five"); 

// Global variables
app = express();
//var arduino_board=new johnny_five.Board(); 
var led_pin=8;

// Serves files in the docs directory
app.listen(3000, () => console.log('listening at http://localhost:3000/'));
app.use(express.static('docs', {extensions: ['html', 'htm']}));