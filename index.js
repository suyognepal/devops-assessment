const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes');
const path = require('path');
const app = express();

// Get port value from environment variable or use default (3000)
const PORT = process.env.PORT || 3000;

// Log startup message
console.log(`Starting app on port ${PORT}`);

app.set('view engine', hbs);
app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
  console.log(`App is now running.`);
});

module.exports = app;

