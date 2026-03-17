import Notification from '../models/Notification.js';

/**
 * Get User Notifications
 * GET /api/notifications/my?all=true
 */
export const getMyNotifications = async (req, res) => {
  try {
    const { all } = req.query;
    
    // Logic: If 'all' is true, fetch everything. Otherwise, just unread.
    const query = { recipient: req.user._id };
    if (all !== 'true') {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort('-createdAt')
      .limit(50); // Prevent overloading the response

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching notifications', 
      error: error.message 
    });
  }
};

/**
 * Mark a notification as read
 * PATCH /api/notifications/:id/read
 */
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};