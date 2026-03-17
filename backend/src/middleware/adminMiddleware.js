/**
 * @desc    Middleware to protect routes that require Admin privileges.
 * @access  Private (Admin Only)
 */
const adminMiddleware = (req, res, next) => {
  // authMiddleware ইতিমধ্যেই req.user অবজেক্টটি সেট করে দিয়েছে
  if (req.user && req.user.isAdmin) {
    next(); // ইউজার এডমিন হলে পরবর্তী ধাপে যাওয়ার অনুমতি দেওয়া হবে
  } else {
    // ৪০৩ (Forbidden) এরর পাঠানো হবে যদি ইউজার এডমিন না হয়
    res.status(403).json({ message: 'Access Denied. Admin privileges required.' });
  }
};

export default adminMiddleware;