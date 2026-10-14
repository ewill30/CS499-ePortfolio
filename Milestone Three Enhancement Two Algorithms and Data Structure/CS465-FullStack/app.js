const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const passport = require('passport');

// Load database connection and models FIRST
require('./app_server/db/db');

// Load Passport configuration AFTER models are registered
require('./app_api/config/passport');

// Load routes AFTER database models and Passport
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

console.log('Starting server...');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// View engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Website routes
app.use('/', indexRouter);

// API routes
app.use('/api', apiRouter);

// Start server
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});