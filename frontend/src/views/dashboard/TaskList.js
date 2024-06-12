import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react';

const TaskList = () => {
  const currentUser = useSelector((state) => state.userData.userData);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks for the logged-in user
    axiosInstance.post('/tasksByUser', { userId: currentUser._id })
      .then(response => {
        const fetchedTasks = response.data.map(task => {
          let color;
          switch (task.status) {
            case 'completed':
              color = 'success';
              break;
            case 'inProgress':
              color = 'primary';
              break;
            case 'notStarted':
              color = 'secondary';
              break;
            case 'cancelled':
              color = 'danger';
              break;
            case 'expired':
              color = 'warning';
              break;
            case 'valid':
              color = 'info';
              break;
            default:
              color = 'dark'; // Default color for undefined statuses
          }

          // Format the dates
          const formattedStartDate = new Date(task.startDate).toLocaleDateString();
          const formattedEndDate = new Date(task.endDate).toLocaleDateString();

          return {
            ...task,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            color,
          };
        });
        setTasks(fetchedTasks);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
      });
  }, [currentUser]);

  return (
    <CContainer>
      <CRow>
        {tasks.map((task, index) => (
          <CCol xs="12" sm="6" md="4" key={index} className="mb-4">
            <CCard
              className="task-card"
              style={{
                transition: 'all 0.3s ease',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', // Add box shadow for hover effect
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <CCardHeader>
                {task.taskName}
                <CBadge color={task.color} className="float-right">
                  {task.status}
                </CBadge>
              </CCardHeader>
              <CCardBody>
                <p><strong>Start Date:</strong> {task.startDate}</p>
                <p><strong>End Date:</strong> {task.endDate}</p>
                <p><strong>Description:</strong> {task.description}</p>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default TaskList;
