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

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector((state) => state.userData.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser._id) {
      console.log('Fetching notifications for user ID:', currentUser._id);
      axios.get(`http://localhost:5000/${currentUser._id}`)
        .then((response) => {
          console.log('Fetched notifications:', response.data);
          // Sort notifications in reverse order (newest first)
          const sortedNotifications = response.data.reverse();
          setNotifications(sortedNotifications);
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, [currentUser]);

  const handleNotificationClick = (notification) => {
    navigate(`/dash/${notification.taskId}`);
    // Mark notification as read or update read status as needed
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
      <CDropdownMenu style={{ minWidth: '300px' }}>
        {notifications.length === 0 ? (
          <CDropdownItem disabled>
            No notifications
          </CDropdownItem>
        ) : (
          notifications.map((notification) => (
            <CDropdownItem
              key={notification._id}
              onClick={() => handleNotificationClick(notification)}
              style={{ fontWeight: notification.read ? 'normal' : 'bold' }}
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
                  src={notification.user}
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
