import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const TaskCalendar = () => {
  const currentUser = useSelector((state) => state.userData.userData);
  const [events, setEvents] = useState([]);
<<<<<<< Updated upstream
=======
  const navigate = useNavigate();
>>>>>>> Stashed changes

  useEffect(() => {
    axiosInstance.post('/tasksByUser', { userId: currentUser._id })
      .then(response => {
        const tasks = response.data.map(task => {
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
              color = 'black';
          }

          return {
            id: task._id,
            title: task.taskName,
            start: task.startDate,
            end: task.endDate,
            color: color,
<<<<<<< Updated upstream
            taskData: task // Store task data for access in eventRender callback
=======
            extendedProps: {
              description: task.description,
              status: task.status,
            },
>>>>>>> Stashed changes
          };
        });
        setEvents(tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
      });
  }, [currentUser]);

<<<<<<< Updated upstream
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
=======
  const handleEventClick = (clickInfo) => {
    const taskId = clickInfo.event.id;
    navigate(`/tasks/${taskId}`);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '2px 4px',
        }}
        title={eventInfo.event.extendedProps.description}
      >
        <b>{eventInfo.timeText}</b>
        <br />
        <i>{eventInfo.event.title}</i>
      </div>
    );
>>>>>>> Stashed changes
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
<<<<<<< Updated upstream
      eventRender={handleEventRender}
=======
      eventClick={handleEventClick}
      eventContent={renderEventContent}
      eventMouseEnter={(mouseEnterInfo) => {
        mouseEnterInfo.el.style.cursor = 'pointer';
        mouseEnterInfo.el.style.transition = 'transform 0.2s, box-shadow 0.2s';
        mouseEnterInfo.el.style.transform = 'scale(1.05)';
        mouseEnterInfo.el.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      }}
      eventMouseLeave={(mouseLeaveInfo) => {
        mouseLeaveInfo.el.style.transform = 'none';
        mouseLeaveInfo.el.style.boxShadow = 'none';
      }}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      }}
      height="auto"
      contentHeight="auto"
>>>>>>> Stashed changes
    />
  );
};

export default TaskCalendar;
