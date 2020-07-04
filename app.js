// RESTful Web App

// npm modules
const bodyParser    = require('body-parser'),
methodOverride      = require('method-override'),
expressSanitizer    = require('express-sanitizer'),
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

// use method-override for PUT requests
app.use(methodOverride('_method'));

// use form sanitizer
app.use(expressSanitizer());



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
app.get('/', function(req, res) {
    res.redirect('blogs');
});


/* index route */
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', {blogs: blogs});
        }
    });
});

/* new route */
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

/* new POST/CREATE route */
app.post('/blogs', function(req, res) {
    // sanitize user data
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log('---------------');
    console.log(req.body);

    // create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render('new');
        }
        else {
            res.redirect('/blogs');
        }
    });
    // redirect
});

/* show route */
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, showBlog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.render('show', {blog: showBlog});
        }
    });
});

/* edit route */
app.get('/blogs/:id/edit', function(req, res) {
    // find blog
    Blog.findById(req.params.id, function(err, showBlog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.render('edit', {blog: showBlog});
        }
    });
});

/* update/PUT route */
app.put('/blogs/:id', function(req, res) {
    // sanitize user data
    req.body.blog.body = req.sanitize(req.body.blog.body);

    // update post
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

/* DELETE route */
app.delete('/blogs/:id', function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs');
        }
    });
});




// start server
const port = 1776;
app.listen(port, console.log(`Server now listening on port ${port}`));





