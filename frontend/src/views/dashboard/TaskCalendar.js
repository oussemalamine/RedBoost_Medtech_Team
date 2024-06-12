import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance';

const TaskCalendar = () => {
  const currentUser = useSelector((state) => state.userData.userData);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch tasks for the logged-in user
    axiosInstance.post('/tasksByUser', { userId: currentUser._id })
      .then(response => {
        const tasks = response.data.map(task => {
          // Assign different colors based on the task status
          let color;
          switch (task.status) {
            case 'completed':
              color = 'green';
              break;
            case 'inProgress':
              color = 'blue';
              break;
            case 'notStarted':
              color = 'gray';
              break;
            case 'cancelled':
              color = 'red';
              break;
            case 'expired':
              color = 'orange';
              break;
            case 'valid':
              color = 'purple';
              break;
            default:
              color = 'black'; // Default color for undefined statuses
          }

          return {
            title: task.taskName,
            start: task.startDate,
            end: task.endDate,
            color: color,
            taskData: task // Store task data for access in eventRender callback
          };
        });
        setEvents(tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
      });
  }, [currentUser]);

  const handleEventRender = (info) => {
    // Add hover effect to calendar events
    const eventElement = info.el;
    eventElement.addEventListener('mouseenter', () => {
      // Add your hover styles here
      eventElement.style.cursor = 'pointer'; // Change cursor to pointer
      eventElement.style.backgroundColor = '#f0f0f0'; // Example background color change
    });
    eventElement.addEventListener('mouseleave', () => {
      // Remove hover styles here
      eventElement.style.cursor = ''; // Reset cursor
      eventElement.style.backgroundColor = ''; // Reset background color
    });
    // Add click event listener to open task details, if needed
    eventElement.addEventListener('click', () => {
      // Access task data from event object
      const taskData = info.event.extendedProps.taskData;
      // Example: Navigate to task details page
      console.log('Task clicked:', taskData);
    });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventRender={handleEventRender}
    />
  );
};

export default TaskCalendar;
