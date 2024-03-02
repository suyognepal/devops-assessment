const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes');
const path = require('path');
const app = express();

// Get port value from environment variable or use default (3000)
const PORT = process.env.PORT || 3000;

app.set('view engine', hbs);
app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});

module.exports = app;

