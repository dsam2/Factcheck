const mongoose = require('mongoose');
/**
 * Database Connection Configuration
 * Handles MongoDB connection setup and error handling
 */
class DBUtil {
  constructor() {
    this.isConnected = false;
  }
 
  /**
   * Connect to MongoDB
   * @param {string} mongoUri - MongoDB connection string
   * @returns {Promise<void>}
   */
  async connect(mongoUri) {
    try {
      if (this.isConnected) {
        console.log('Already connected to MongoDB');
        return;
      }
 
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
 
      this.isConnected = true;
      console.log('✓ MongoDB connected successfully');
    } catch (error) {
      console.error('✗ MongoDB connection failed:', error.message);
      throw error;
    }
  }
 
  /**
   * Disconnect from MongoDB
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      if (!this.isConnected) {
        console.log('Not connected to MongoDB');
        return;
      }
 
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('✓ MongoDB disconnected successfully');
    } catch (error) {
      console.error('✗ MongoDB disconnection failed:', error.message);
      throw error;
    }
  }
 
  /**
   * Get connection status
   * @returns {boolean}
   */
  getStatus() {
    return this.isConnected;
  }
}
 
module.exports = new DBUtil();