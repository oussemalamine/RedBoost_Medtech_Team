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
  CAvatar,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const currentUser = useSelector((state) => state.userData.userData);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance
      .post('/tasksByUser', { userId: currentUser._id })
      .then((response) => {
        const fetchedTasks = response.data.map((task) => {
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
              color = 'dark';
          }

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
      .catch((error) => {
        console.error('Error fetching tasks', error);
      });
  }, [currentUser]);

  const getStatusBadge = (status) => {
    let color;
    switch (status) {
      case 'completed':
        color = 'success';
        break;
      case 'inProgress':
        color = 'warning';
        break;
      case 'notStarted':
        color = 'secondary';
        break;
      case 'cancelled':
        color = 'danger';
        break;
      case 'expired':
        color = 'danger';
        break;
      case 'valid':
        color = 'info';
        break;
      default:
        color = 'dark';
    }
    return <CBadge color={color}>{status}</CBadge>;
  };

  return (
    <CContainer>
      
            <CCardBody>
              <CTable align="middle" className="mb-0 border table-sm" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Task
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">End Date</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tasks.map((task, index) => (
                     
                    <CTableRow
                      key={index}
                      onClick={() => console.log('Clicked Task ID:', task._id)} // Handle task click action
                      style={{ cursor: 'pointer' }}
                    >
                      <CTableDataCell className="text-center">
                        {task.taskName}
                      </CTableDataCell>
                      <CTableDataCell>
                        {getStatusBadge(task.status)}
                      </CTableDataCell>
                      <CTableDataCell>{task.endDate}</CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/dash/${task._id}`} className="btn btn-sm btn-info me-2">
                          View
                        </Link>
                        
                      </CTableDataCell>
                      
                    </CTableRow>

                    
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
         
    </CContainer>
  );
};

export default TaskList;
