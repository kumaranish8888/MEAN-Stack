const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

//mongoose.Promise = require('bluebird');


const app = express(config.database);

const users = require('./routes/users');

//Connect To Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log("Connected to database" +config.database);
} )

//On error
mongoose.connection.on('error', (err) => {
    console.log("Database error" +err);
} )

//CORS Middleware
app.use(cors())
   
//BodyParser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.authenticate());
app.use(passport.session());

require('./config/passport')(passport);

//Set Static folder that is the front end
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
} )



