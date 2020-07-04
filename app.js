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
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model('blog', blogSchema);

// Blog.create({
//     title: 'Test post',
//     image: 'https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png',
//     body: 'Nostrud quis nisi laborum ullamco commodo consectetur duis esse ex laborum. Pariatur cillum laborum elit consectetur. Elit commodo tempor et in tempor do non eu dolor Lorem tempor reprehenderit.'
// });


// RESTFUL ROUTES
app.get('/', function() {
    res.send('Index page');
});

app.get('/blogs', function(req, res) {
    res.render('index');
});



// start server
const port = 1776;
app.listen(port, console.log(`Server now listening on port ${port}`));





