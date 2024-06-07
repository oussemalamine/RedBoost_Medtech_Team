import {
  CCard,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { HiMagnifyingGlassCircle } from 'react-icons/hi2'
import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import { FaCircle, FaCirclePlus } from 'react-icons/fa6'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'
import EditTask from './EditTask'
import TaskView from './TaskView'
import AddTask from './AddTask'
import TaskSlice, { createTask } from '../../app/features/task/taskSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const TaskStatusCard = ({ status, tasks, color }) => {
  return (
    <CCol xs={12} md={4}>
      <CCard className="mb-3" style={{ height: '400px' }}>
        <CCardHeader
          className="text-light"
          style={{
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {status}
        </CCardHeader>
        <CCardBody style={{ overflow: 'auto' }}>
          {tasks.map((task, index) => {
            if (task.status === status) {
              return (
                <div className="container" key={index}>
                  <div
                    onClick={() => handleModalVisibility(task)}
                    className="card border border-success shadow mb-3"
                    style={{ maxWidth: '400px' }}
                  >
                    <div className="card-header">
                      <strong>{task.taskName}</strong>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="text-muted">
                          <CIcon icon={cilCalendar} className="mr-1" />
                          {new Date(task.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </CCardBody>
      </CCard>
    </CCol>
  )
}

function Activity({ activity, tasks }) {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedtask] = useState(null)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem)
  const dispatch = useDispatch()
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(tasks.length / itemsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleAddTask = (Data) => {
    const taskData = {
      ...Data,
      xpPoints: 0,
      resources: [],
      deliverables: [],
      kpis: [],
      activityId: activity._id,
    }
    console.log(taskData)
    dispatch(createTask(taskData))
    setAddModalVisible(false)
  }
  const getValidTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'valid') {
        nb++
      }
    })
    return nb
  }
  const getProgressTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'inProgress') {
        nb++
      }
    })
    return nb
  }
  const getCompletedTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'completed') {
        nb++
      }
    })
    return nb
  }
  const getNotStartedTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'notStarted') {
        nb++
      }
    })
    return nb
  }
  const getCancelledTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'cancelled') {
        nb++
      }
    })
    return nb
  }
  const getExpiredTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'expired') {
        nb++
      }
    })
    return nb
  }

  const handleModalVisibility = (task) => {
    setSelectedtask(task)
    setVisible(true)
  }
  const handleViewTask = (task) => {
    const currentPath = window.location.pathname
    navigate(`${currentPath}/${task.taskName}`)
  }
  const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1), // getMonth() is zero-based
      day = '' + date.getDate(),
      year = date.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  return (
    <>
      {addModalVisible && (
        <AddTask
          setOpen={setAddModalVisible}
          open={addModalVisible}
          handleAddTask={handleAddTask}
          activity={activity}
        />
      )}
      <CContainer style={{ padding: '20px' }} className="mt-4">
        {selectedTask && (
          <EditTask
            visible={visible}
            setVisible={setVisible}
            selectedTask={selectedTask}
            setSelectedtask={setSelectedtask}
          />
        )}
        {selectedTask && <TaskView open={open} setOpen={setOpen} selectedTask={selectedTask} />}
        <CRow>
          <CCol>
            <CButton
              onClick={() => setAddModalVisible(true)}
              className="mb-3"
              rounded="lg"
              color="primary"
              style={{ float: 'right' }}
            >
              Add Task
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <TaskStatusCard status={'notStarted'} tasks={tasks} color={'#006666'} />
          <TaskStatusCard status="inProgress" tasks={tasks} color={'#fb5858'} />
          <TaskStatusCard status={'completed'} tasks={tasks} color={'#0ca279'} />
          <TaskStatusCard status={'valid'} tasks={tasks} color={'#074a38'} />
          <TaskStatusCard status={'expired'} tasks={tasks} color={'#dab600'} />
          <TaskStatusCard status={'cancelled'} tasks={tasks} color={'grey'} />
        </CRow>
        <CRow>
          <CCol>
            <CCard className="mb-3">
              <CCardHeader className="bg-dark text-light">Recent Tasks</CCardHeader>
              <CCardBody>
                <CTable striped responsive className="text-center">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Target Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Task Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">View</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentTasks.map((task, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {new Date(task.endDate).toLocaleDateString()}
                        </CTableDataCell>
                        <CTableDataCell>{task.taskName}</CTableDataCell>
                        <CTableDataCell>{task.status}</CTableDataCell>
                        <CTableDataCell>
                          <HiMagnifyingGlassCircle
                            role="button"
                            style={{ fontSize: '25px', color: '#4CAF50' }}
                            onClick={() => handleViewTask(task)}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <CPagination pages={totalPages} align="center">
                  <CPaginationItem
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1}
                    aria-label="Previous"
                  >
                    Previous
                  </CPaginationItem>
                  <CPaginationItem
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages}
                    aria-label="Next"
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard className="mb-3">
              <CCardHeader className="bg-dark text-light">Task Progress</CCardHeader>
              <CCardBody>
                <CChart
                  type="bar"
                  data={{
                    labels: [
                      'Total Tasks',
                      'In Progress',
                      'Completed',
                      'Valid',
                      'Expired',
                      'Cancelled',
                      'Not Started',
                    ],
                    datasets: [
                      {
                        label: 'Task Progress',
                        backgroundColor: ['pink, lightgreen, green, yellow,grey,blue'],
                        data: [
                          tasks.length,

                          getProgressTasks(),
                          getCompletedTasks(),
                          getValidTasks(),
                          getExpiredTasks(),
                          getCancelledTasks(),
                          getNotStartedTasks(),
                        ],
                      },
                    ],
                  }}
                  labels="Status"
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#adb7c5',
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: '#adb7c5',
                        },
                        ticks: {
                          color: '#adb7c5',
                        },
                      },
                      y: {
                        grid: {
                          color: '#adb7c5',
                        },
                        ticks: {
                          color: '#adb7c5',
                        },
                      },
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Activity
