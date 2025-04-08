const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongo = require('./db');

const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/auth', require('./routes/auth'));
app.use('/review', require('./routes/review'));
app.use('/search', require('./routes/scraper'));

// Deployment Setup
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/Frontend/build")));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "build", "index.html"));
});

// Start Server
app.listen(5000, () => {
  console.log("Review-hub is running on port 5000");
});
