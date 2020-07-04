// RESTful Web App

// npm modules
const bodyParser    = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express();


// connect to MongoDB
mongoose.connect('mongodb://localhost/restful_blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// setup EJS engine
app.set('view engine', 'ejs');

// use public asssets
app.use(express.static('public'));

// use body parser
app.use(bodyParser.urlencoded({extended: true}));

// mongoDB Schema/Model config
const blogSchema = new.mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const blog = mongoose.model('blogSchema ');



// map routes
app.get('/', function(req, res) {
    res.send('RESTful Web App');
});



// start server
const port = 1776;
app.listen(port, console.log(`Server now listening on port ${port}`));





