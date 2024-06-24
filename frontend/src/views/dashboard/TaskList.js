import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../axiosInstance'
import { CCard, CCardBody, CCardHeader, CContainer, CRow, CCol, CBadge } from '@coreui/react'
import { Link } from 'react-router-dom'

const TaskList = () => {
  const currentUser = useSelector((state) => state.userData.userData)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axiosInstance
      .post('/tasksByUser', { userId: currentUser._id })
      .then((response) => {
        const fetchedTasks = response.data.map((task) => {
          let color
          switch (task.status) {
            case 'completed':
              color = 'success'
              break
            case 'inProgress':
              color = 'primary'
              break
            case 'notStarted':
              color = 'secondary'
              break
            case 'cancelled':
              color = 'danger'
              break
            case 'expired':
              color = 'warning'
              break
            case 'valid':
              color = 'info'
              break
            default:
              color = 'dark'
          }

          const formattedStartDate = new Date(task.startDate).toLocaleDateString()
          const formattedEndDate = new Date(task.endDate).toLocaleDateString()

          return {
            ...task,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            color,
          }
        })
        setTasks(fetchedTasks)
      })
      .catch((error) => {
        console.error('Error fetching tasks', error)
      })
  }, [currentUser])

  const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }

  return (
    <CContainer>
      <CRow>
        {tasks.map((task, index) => (
          <CCol xs="12" sm="6" md="4" key={index} className="mb-4">
           <Link to={`/Dash/${task._id}`}
              style={{ textDecoration: 'none' }}
              onClick={() => console.log('Clicked Task ID:', task._id)} // Log the taskId
            >
              <CCard
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = cardHoverStyle.transform
                  e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <CCardHeader>
                  {task.taskName}
                  <CBadge color={task.color} className="float-right">
                    {task.status}
                  </CBadge>
                </CCardHeader>
                <CCardBody>
                  <p>
                    <strong>Start Date:</strong> {task.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {task.endDate}
                  </p>
                  <p>
                    <strong>Description:</strong> {task.description}
                  </p>
                </CCardBody>
              </CCard>
            </Link>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  )
}

export default TaskList
