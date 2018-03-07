const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('serverAccess.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to serverAccess.log');
        }
    });

    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.statusCode = 200;
    // res.type('html').
    // res.send('<h1>Joels Node -- DOPE!</h1>');
    
    // res.send({
    //     name: 'Steve',
    //     likes: [
    //         'bikes',
    //         'weed'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my site!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Joels About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send('<s>Something BAD happened!</s><div><a href="/help.html">Help</a></div>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});