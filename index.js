const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('express-flash');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(flash());
app.use(session({
    name: 'todoapp',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // 100 minutes
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'enabled'
    //     },
    //     function(err) {
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//extract styles and jacasvript from the sub-pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScript', true);


//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');



//using express router
app.use('/', require('./routes'));

const listener = app.listen(process.env.PORT || 3000, (err) => {
    if(err)
        console.log(`Error in running the server: ${err}`);
    console.log('Your app is listening on port ' + listener.address().port);
}) 