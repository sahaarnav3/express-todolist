const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config()
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract styles and jacasvript from the sub-pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScript', true);


//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');



//using express router
app.use('/', require('./routes'));

// app.get("/", (req, res) => {
//     res.send("Chalra bhau");
// })

const listener = app.listen(process.env.PORT || 3000, (err) => {
    if(err)
        console.log(`Error in running the server: ${err}`);
    console.log('Your app is listening on port ' + listener.address().port);
}) 