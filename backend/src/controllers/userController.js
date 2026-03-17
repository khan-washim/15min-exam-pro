import User from '../models/User.js';

/**
 * Get User Profile
 * GET /api/users/profile
 */
export const getProfile = async (req, res) => {
  try {
    // req.user._id comes from your protect middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * Update User Profile
 * PUT /api/users/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if they are provided in the request
    if (name) user.name = name;
    if (bio) user.bio = bio;

    const updatedUser = await user.save();

    // Return the updated user without the password
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      isAdmin: updatedUser.isAdmin
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};