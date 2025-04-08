const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToMongo = require('./db');

const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors({
  origin: 'https://reviewhub-v62d.onrender.com', // 👈 Allow frontend to call backend
  credentials: true
}));
app.use(express.json());

// Available Routes
app.use('/auth', require('./routes/auth'));
app.use('/review', require('./routes/review'));
app.use('/search', require('./routes/scraper'));

// Deployment Setup
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "Frontend", "build")));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "build", "index.html"));
});

// Start Server on dynamic port (Render needs this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Review-hub is running on port ${PORT}`);
});
