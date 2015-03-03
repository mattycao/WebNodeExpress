/**
 * Created by caoyangkaka on 3/2/15.
 */
var express = require('express');

var app = express();
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
];

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
// use the app.get(verb), this method do a lot even omit the capital char and the following query
app.get('/', function (req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
    res.render('home');
});
// default code is 200, so unnecessary here
app.get('/about', function (req, res) {
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    //res.render('about');
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

// sequence here is important, and use the number of parameters to distingiush the 404 and 500
app.use(function (req, res) {
    // omit this because default return text/html
    //res.type('text/plain');
    res.status(404);
    //res.send('404 - Not found.');
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    //res.send('500 - Server Error.');
    res.render('500');
});


app.listen(app.get('port'), function () {
    console.log('Express started on the http://localhost:' + app.get('port') + "; press Ctrl-C to terminate.");
})