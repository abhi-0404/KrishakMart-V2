import API from './api';

export interface Notification {
  _id: string;
  userId: string;
  type: 'order_placed' | 'order_accepted' | 'order_rejected' | 'order_packed' | 'order_shipped' | 'order_delivered' | 'order_cancelled' | 'new_product' | 'stock_low';
  title: string;
  message: string;
  orderId?: string;
  productId?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// Get user notifications
export const getNotifications = async () => {
  try {
    const { data } = await API.get('/notifications');
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId: string) => {
  try {
    const { data } = await API.put(`/notifications/${notificationId}/read`);
    return data.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const { data } = await API.put('/notifications/read-all');
    return data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (notificationId: string) => {
  try {
    const { data } = await API.delete(`/notifications/${notificationId}`);
    return data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};
