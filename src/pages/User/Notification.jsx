import React, { useEffect, useState } from "react";
import { getAllNotificationsAPI, markAsReadAPI } from "../../api/user";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await getAllNotificationsAPI();
          console.log(response, "response of notification");
  
          if (response?.data?.success) {
            setNotifications(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
  
      fetchNotifications();
    }, []);
  
    // Mark a notification as read
    const handleMarkAsRead = async (id) => {
      try {
        await markAsReadAPI(id); // API call to mark notification as read
        
        // Update state optimistically
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === id ? { ...notification, isRead: true } : notification
          )
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    };
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
  
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`p-4 border rounded-lg shadow-md cursor-pointer ${
                  notification.isRead ? "bg-gray-100" : "bg-blue-100"
                }`}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                {/* Notification Heading */}
                <h3
                  className={`text-lg font-bold ${
                    notification.isRead ? "text-gray-600" : "text-blue-600"
                  }`}
                >
                  {notification.heading}
                </h3>
                {/* Notification Message */}
                <p className="text-gray-700">{notification.message}</p>
                {/* Timestamp */}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
                {/* Unread Indicator */}
                {!notification.isRead && (
                  <span className="text-sm text-red-500 font-semibold">
                    You may have new Notifications, Tap to view.
                  </span>
                
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    );
  };
  
  export default Notification;