import Notification from '../models/Notification';

export const NotificationService = {
  async createNotification(userId, title, message, type) {
    await Notification.create({ recipient: userId, title, message, type });
  }
};