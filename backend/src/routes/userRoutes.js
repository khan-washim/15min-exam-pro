import express from 'express';
// Use import instead of require for your controllers
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router(); // Removed the '=' syntax error

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    // Logic for verification would go here
    next();
};

// Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router; // Use export default instead of module.exports