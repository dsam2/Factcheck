const bcrypt = require('bcrypt')
const User = require('../model/User');
 
/**
 * User Service Class
 * Handles all CRUD operations for User model
 */
class UserService {
  /**
   * Create a new user
   * @param {Object} userData - User data object
   * @returns {Promise<Object>} Created user object
   */
  async createUser(userData) {
    try {

      const user = new User(userData);
      const savedUser = await user.save();
      const existinguser = await User.findOne({ email: userData.email });

     
      if (existinguser) {
        return{ success: false, message: 'Email already exists'};        
      }
      const hashedpassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedpassword;

      return {
        success: true,
        data: savedUser,
        message: 'User created successfully',
      };


      
    } 
      catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create user',
      };
    }
  }
 
  /**
   * Get all users
   * @param {number} page - Page number for pagination
   * @param {number} limit - Limit per page
   * @returns {Promise<Object>} List of users
   */
  async getAllUsers(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const users = await User.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
     
      const total = await User.countDocuments();
 
      return {
        success: true,
        data: users,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          limit,
        },
        message: 'Users retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve users',
      };
    }
  }
 
  /**
   * Get user by ID
   * @param {string} userId - User ID (MongoDB ObjectId)
   * @returns {Promise<Object>} User object
   */
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
 
      if (!user) {
        return {
          success: false,
          data: null,
          message: 'User not found',
        };
      }
 
      return {
        success: true,
        data: user,
        message: 'User retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve user',
      };
    }
  }
 
  /**
   * Update user by ID
   * @param {string} userId - User ID (MongoDB ObjectId)
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user object
   */
  async updateUser(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });
 
      if (!user) {
        return {
          success: false,
          data: null,
          message: 'User not found',
        };
      }
 
      return {
        success: true,
        data: user,
        message: 'User updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update user',
      };
    }
  }
 
  /**
   * Delete user by ID
   * @param {string} userId - User ID (MongoDB ObjectId)
   * @returns {Promise<Object>} Deletion result
   */
  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
 
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
 
      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete user',
      };
    }
  }
 
  /**
   * Search users by email or name
   * @param {string} searchTerm - Search term
   * @returns {Promise<Object>} Matching users
   */
  async searchUsers(searchTerm) {
    try {
      const users = await User.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
        ],
      });
 
      return {
        success: true,
        data: users,
        message: 'Users found',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to search users',
      };
    }
  }
}
 
module.exports = new UserService();
 