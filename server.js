const express = require('express');
const connectDB = require('./config/database');
const { connectQueue } = require('./config/queue');
const authRoutes = require('./routes/auth');
const queueRoutes = require('./routes/queue');
const winston = require('winston');
const client = require('prom-client');
require('dotenv').config();

// Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// Connect to DB and Queue
connectDB();
connectQueue();

// Routes
app.use('/auth', authRoutes);
app.use('/api', queueRoutes);

// Metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
