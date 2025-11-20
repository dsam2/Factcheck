require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DBUtil = require('./config/Database');
const userRoutes = require('./routes/userRoutes');
 
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/signup';
 
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    dbConnected: DBUtil.getStatus(),
  });
});
 
/**
 * API Routes
 */
app.use('/api/users', userRoutes);
 
/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});
 
/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message,
    message: 'Internal server error',
  });
});
 
/**
 * Start Server
 */
async function startServer() {
  try {
    // Connect to MongoDB
    await DBUtil.connect(MONGODB_URI);
 
    // Start Express server
    app.listen(PORT, () => {
 
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Database: Connected`);
   
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
 
/**
 * Graceful Shutdown
 */
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await DBUtil.disconnect();
  process.exit(0);
});
 
startServer();