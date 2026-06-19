// app/backend/src/repositories/user.repository.js

import User from '../models/user.model.js';
import { logger } from '../../../../packages/common/logger/index.js';
import { NotFoundError } from '../../../../packages/common/errors/index.js';

/**
 * Find user by email
 * @param {string} email - User's email
 * @param {boolean} includePassword - Include password field
 * @returns {Promise<Object|null>}
 */
export const findByEmail = async (email, includePassword = false) => {
  try {
    const query = User.findOne({ email: email.toLowerCase() });
    if (!includePassword) {
      query.select('-password');
    }
    return await query;
  } catch (error) {
    logger.error(`Error finding user by email: ${error.message}`);
    throw error;
  }
};

/**
 * Find user by ID
 * @param {string} id - User's ID
 * @param {boolean} includePassword - Include password field
 * @returns {Promise<Object|null>}
 */
export const findById = async (id, includePassword = false) => {
  try {
    const query = User.findById(id);
    if (!includePassword) {
      query.select('-password -__v');
    }
    return await query;
  } catch (error) {
    logger.error(`Error finding user by ID: ${error.message}`);
    throw error;
  }
};

/**
 * Create new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>}
 */
export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    // Remove password from returned object
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

/**
 * Update user
 * @param {string} id - User's ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>}
 */
export const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true,
        runValidators: true,
        select: '-password -__v'
      }
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    throw error;
  }
};

/**
 * Update user password
 * @param {string} id - User's ID
 * @param {string} newPassword - New hashed password
 * @returns {Promise<Object>}
 */
export const updatePassword = async (id, newPassword) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true, select: '-password -__v' }
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error(`Error updating password: ${error.message}`);
    throw error;
  }
};

/**
 * Update last login timestamp
 * @param {string} id - User's ID
 * @returns {Promise<void>}
 */
export const updateLastLogin = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { lastLogin: new Date() });
  } catch (error) {
    logger.error(`Error updating last login: ${error.message}`);
    throw error;
  }
};

/**
 * Verify user email
 * @param {string} id - User's ID
 * @returns {Promise<void>}
 */
export const verifyUserEmail = async (id) => {
  try {
    await User.findByIdAndUpdate(id, {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null
    });
  } catch (error) {
    logger.error(`Error verifying email: ${error.message}`);
    throw error;
  }
};

/**
 * Find user by verification token
 * @param {string} token - Verification token
 * @returns {Promise<Object|null>}
 */
export const findUserByVerificationToken = async (token) => {
  try {
    return await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });
  } catch (error) {
    logger.error(`Error finding user by verification token: ${error.message}`);
    throw error;
  }
};

/**
 * Find user by reset token
 * @param {string} token - Reset token
 * @returns {Promise<Object|null>}
 */
export const findUserByResetToken = async (token) => {
  try {
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  } catch (error) {
    logger.error(`Error finding user by reset token: ${error.message}`);
    throw error;
  }
};

/**
 * Clear reset token
 * @param {string} id - User's ID
 * @returns {Promise<void>}
 */
export const clearResetToken = async (id) => {
  try {
    await User.findByIdAndUpdate(id, {
      resetPasswordToken: null,
      resetPasswordExpires: null
    });
  } catch (error) {
    logger.error(`Error clearing reset token: ${error.message}`);
    throw error;
  }
};

/**
 * Increment failed login attempts
 * @param {string} id - User's ID
 * @returns {Promise<void>}
 */
export const incrementFailedAttempts = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return;

    user.failedLoginAttempts += 1;
    
    // Lock account after 5 failed attempts
    if (user.failedLoginAttempts >= 5) {
      user.isLocked = true;
      user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    }
    
    await user.save();
  } catch (error) {
    logger.error(`Error incrementing failed attempts: ${error.message}`);
    throw error;
  }
};

/**
 * Reset failed login attempts
 * @param {string} id - User's ID
 * @returns {Promise<void>}
 */
export const resetFailedAttempts = async (id) => {
  try {
    await User.findByIdAndUpdate(id, {
      failedLoginAttempts: 0,
      isLocked: false,
      lockUntil: null
    });
  } catch (error) {
    logger.error(`Error resetting failed attempts: ${error.message}`);
    throw error;
  }
};

/**
 * Delete user (hard delete)
 * @param {string} id - User's ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    throw error;
  }
};

/**
 * Soft delete user
 * @param {string} id - User's ID
 * @returns {Promise<Object>}
 */
export const softDeleteUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
        isActive: false
      },
      { new: true, select: '-password -__v' }
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error(`Error soft deleting user: ${error.message}`);
    throw error;
  }
};

/**
 * Find all users with pagination
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>}
 */
export const findAllUsers = async (options = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = { createdAt: -1 },
      filter = {},
      search = ''
    } = options;

    const skip = (page - 1) * limit;
    const query = { ...filter };

    // Add search
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select('-password -__v'),
      User.countDocuments(query)
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    logger.error(`Error finding all users: ${error.message}`);
    throw error;
  }
};

/**
 * Get user statistics
 * @returns {Promise<Object>}
 */
export const getUserStatistics = async () => {
  try {
    const stats = await User.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          active: [
            { $match: { isActive: true } },
            { $count: 'count' }
          ],
          verified: [
            { $match: { isEmailVerified: true } },
            { $count: 'count' }
          ],
          today: [
            {
              $match: {
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
              }
            },
            { $count: 'count' }
          ],
          byRole: [
            { $unwind: '$roles' },
            { $group: { _id: '$roles', count: { $sum: 1 } } }
          ]
        }
      }
    ]);

    const result = stats[0];
    return {
      totalUsers: result.total[0]?.count || 0,
      activeUsers: result.active[0]?.count || 0,
      verifiedUsers: result.verified[0]?.count || 0,
      todayRegistered: result.today[0]?.count || 0,
      byRole: result.byRole
    };
  } catch (error) {
    logger.error(`Error getting user statistics: ${error.message}`);
    throw error;
  }
};

/**
 * Find users by role
 * @param {string} roleId - Role ID
 * @returns {Promise<Array>}
 */
export const findUsersByRole = async (roleId) => {
  try {
    return await User.find({ roles: roleId })
      .select('-password -__v')
      .populate('roles');
  } catch (error) {
    logger.error(`Error finding users by role: ${error.message}`);
    throw error;
  }
};

/**
 * Search users
 * @param {string} searchTerm - Search term
 * @param {number} limit - Limit results
 * @returns {Promise<Array>}
 */
export const searchUsers = async (searchTerm, limit = 20) => {
  try {
    return await User.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .select('-password -__v')
    .limit(limit);
  } catch (error) {
    logger.error(`Error searching users: ${error.message}`);
    throw error;
  }
};

/**
 * Bulk create users
 * @param {Array} usersData - Array of user data
 * @returns {Promise<Array>}
 */
export const bulkCreateUsers = async (usersData) => {
  try {
    const users = await User.insertMany(usersData, { ordered: false });
    return users.map(user => {
      const obj = user.toObject();
      delete obj.password;
      return obj;
    });
  } catch (error) {
    logger.error(`Error bulk creating users: ${error.message}`);
    throw error;
  }
};

/**
 * Check if user exists
 * @param {Object} filter - Filter conditions
 * @returns {Promise<boolean>}
 */
export const userExists = async (filter) => {
  try {
    return await User.exists(filter);
  } catch (error) {
    logger.error(`Error checking user existence: ${error.message}`);
    throw error;
  }
};