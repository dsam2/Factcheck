const express = require('express');
const userService = require('../services/UserService');
 
const router = express.Router();
 
/**
 * GET /api/users - Get all users with pagination
 * Query params: page=1&limit=10
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
 
    const result = await userService.getAllUsers(page, limit);
 
    if (result.success) {
      return res.status(200).json(result);
    }
 
    return res.status(500).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
});
 
/**
 * GET /api/users/:id - Get user by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.id);
 
    if (result.success) {
      return res.status(200).json(result);
    }
 
    return res.status(404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
});
 
/**
 * GET /api/users/search?q=term - Search users by name or email
 */
router.get('/search/:term', async (req, res) => {
  try {
    const result = await userService.searchUsers(req.params.term);
 
    if (result.success) {
      return res.status(200).json(result);
    }
 
    return res.status(500).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
});
 
/**
 * POST /api/users - Create a new user
 * Body: { name, email, age, phone, isActive }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, age, phone, isActive } = req.body;
 
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }
 
    const userData = {
      name,
      email,
      age,
      phone,
      isActive: isActive !== undefined ? isActive : true,
    };
 
    const result = await userService.createUser(userData);
 
    if (result.success) {
      return res.status(201).json(result);
    }
 
    return res.status(400).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
});
 
/**
 * PUT /api/users/:id - Update user by ID
 * Body: { name, email, age, phone, isActive }
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
 
    // Validate that at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one field must be provided for update',
      });
    }
 
    const result = await userService.updateUser(userId, updateData);
 
    if (result.success) {
      return res.status(200).json(result);
    }
 
    return res.status(404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
});
 
/**
 * DELETE /api/users/:id - Delete user by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
 
    if (result.success) {
      return res.status(200).json(result);
    }
 
    return res.status(404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
});
 
module.exports = router;