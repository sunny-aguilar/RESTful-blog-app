// RESTful Web App

const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose');


// map routes
app.get('/', function(req, res) {
    res.send('RESTful Web App');
});



// start server
const port = 1776;
app.listen(port, console.log(`Server now listening on port ${port}`));





