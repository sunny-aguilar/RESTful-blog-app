// RESTful Web App

// npm modules
const bodyParser    = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express();


// connect to MongoDB
mongoose.connect('mongodb://localhost/restful_blog_app', {
    //
});

// map routes
app.get('/', function(req, res) {
    res.send('RESTful Web App');
});



// start server
const port = 1776;
app.listen(port, console.log(`Server now listening on port ${port}`));





