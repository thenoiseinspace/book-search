const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost:27017/book-database',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// );

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
