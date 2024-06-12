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
            color: color
          };
        });
        setEvents(tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
      });
  }, [currentUser]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default TaskCalendar;
