import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CBadge,
  CAvatar,
} from '@coreui/react';
import { cilList } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import notification_sound from '../../assets/notification-sounds.wav'; 

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector((state) => state.userData.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser._id) {
      axios.get(`http://localhost:5000/${currentUser._id}`) // Ensure this endpoint matches your backend
        .then((response) => {
          const sortedNotifications = response.data.reverse();
          setNotifications(sortedNotifications);
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
        });
  
      const ws = new WebSocket('ws://localhost:5000'); // Ensure this matches your server port
  
      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        if (notification.userId === currentUser._id) {
          const audio = new Audio(notification_sound); // Use imported notification sound
          audio.play();
          toast(notification.title, {
            onClose: () => setNotifications((prev) => [notification, ...prev]),
          });
        }
      };

      ws.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        setTimeout(() => {
          // Reconnect on close
          new WebSocket('ws://localhost:5000');
        }, 1000);
      };
  
      return () => {
        ws.close();
      };
    }
  }, [currentUser]);

  const handleNotificationClick = (notification) => {
    // Update notification as read locally
    const updatedNotifications = notifications.map((notif) =>
      notif._id === notification._id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);

    // Optionally, update notification as read on the server

    axios.put(`http://localhost:5000/${notification._id}`, { read: true })

      .then((response) => {
        console.log('Notification marked as read:', response.data);
      })
      .catch((error) => {
        console.error('Error marking notification as read:', error);
      });

    navigate(`/dash/${notification.taskId}`);
  };

  return (
    <CDropdown variant="nav-item" placement="bottom-end">
      <CDropdownToggle caret={false}>
        <CIcon icon={cilList} size="lg" />
        <CBadge
          color="danger"
          shape="pill"
          size="sm"
          className="position-absolute top-0 start-100 translate-middle"
        >
          {notifications.filter((notif) => !notif.read).length}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu style={{ minWidth: '600px', maxWidth: '700px', maxHeight: '400px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <CDropdownItem disabled>
            No notifications
          </CDropdownItem>
        ) : (
          notifications.map((notification) => (
            <CDropdownItem
              key={notification._id}
              onClick={() => handleNotificationClick(notification)}
              style={{ fontWeight: notification.read ? 'normal' : 'bold', whiteSpace: 'normal' }}
            >
              <div className="d-flex align-items-center">
                {!notification.read && (
                  <div
                    className="me-3"
                    style={{
                      width: '4px',
                      height: '100%',
                      backgroundColor: 'blue',
                      marginRight: '10px',
                    }}
                  />
                )}
                <CAvatar
                  src={notification.user} // Ensure this is the correct path to the user's avatar
                  size="md"
                  status="success"
                  className="me-3"
                />
                <div>
                  <div className={`fw-semibold ${notification.read ? '' : 'text-primary'}`}>
                    {notification.title}
                  </div>
                  <div className="text-small text-muted">
                    {formatDistanceToNow(new Date(notification.creationTime), { addSuffix: true })}
                  </div>
                  <div className="text-muted">{notification.text}</div>
                </div>
              </div>
            </CDropdownItem>
          ))
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default NotificationDropdown;
