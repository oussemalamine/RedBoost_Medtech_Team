import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
  CFormCheck,
  CFormTextarea,
  CForm,
} from '@coreui/react'
import { updateTask } from '../../app/features/task/taskSlice'
import { useDispatch } from 'react-redux'
import CommentSection from './CommentSection'
import img from '../Images/details.webp'
import { IoClose } from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Task = ({ task }) => {
  const dispatch = useDispatch()
  const [currentTask, setCurrentTask] = useState(task)
  const [newKpiLabel, setNewKpiLabel] = useState('')
  const [newKpiValue, setNewKpiValue] = useState('')
  const [newDeliverableName, setNewDeliverableName] = useState('')
  const [newRapportTitle, setNewRapportTitle] = useState('')
  const [newRapportText, setNewRapportText] = useState('')
  const [newComment, setNewComment] = useState('')
  const [deliverableFile, setDeliverableFile] = useState(null)
  const [statusMessage, setStatusMessage] = useState(task.status === 'completed' ? 'Task completed' : 'Task in progress')

  useEffect(() => {
    console.log("Task Prop:", task) // Debugging log
    console.log("Current Task:", currentTask); // Debugging log
  }, [task, currentTask])

  const handleToggleTaskStatus = () => {
    if (task.status === 'inProgress' && task.deliverables.length === 0) {
      alert('Please add a deliverable before changing the status')
      return
    }

    let updatedStatusMessage = ''
    if (task.status === 'completed') {
      updatedStatusMessage = 'Task in progress'
    } else {
      updatedStatusMessage = 'Task completed'
    }

    const updatedTask = {
      ...task,
      status: task.status === 'completed' ? 'inProgress' : 'completed',
    }

    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )

    setCurrentTask(updatedTask)
    setStatusMessage(updatedStatusMessage)
  }

  const notifyError = (field) => {
    toast.error(`The ${field} field is required.`, {
      autoClose: 3000,
    })
  }

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank')
  }

  const handleAddKpi = () => {
    if (newKpiLabel === '') {
      return notifyError('Kpi Label')
    } else if (newKpiValue === '') {
      return notifyError('Kpi Value')
    }
    const updatedTask = {
      ...task,
      kpis: [...task.kpis, { label: newKpiLabel, count: newKpiValue }],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
    setCurrentTask(updatedTask)
  }

  const handleAddDeliverable = async (e) => {
    e.preventDefault()
    if (newDeliverableName === '') {
      return notifyError('Deliverable Name')
    }

    if (!deliverableFile) {
      return notifyError('Deliverable File')
    }

    try {
      const formData = new FormData()
      formData.append('file', deliverableFile)

      console.log('Uploading file:', deliverableFile) // Debugging log

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Upload response:', response.data) // Debugging log

      const updatedTask = {
        ...task,
        deliverables: [
          ...task.deliverables,
          {
            fileName: newDeliverableName ? newDeliverableName : deliverableFile.name,
            fileUrl: response.data.secure_url, 
          },
        ],
      }

      dispatch(
        updateTask({
          taskId: task._id,
          taskData: updatedTask,
        }),
      )
      setCurrentTask(updatedTask)
      setNewDeliverableName('')
      setDeliverableFile(null)
    } catch (error) {
      console.error('Error uploading file:', error) // Debugging log
      toast.error('Failed to upload file. Please try again.')
    }
  }

  const handleAddRapport = () => {
    if (newRapportTitle === '') {
      return notifyError('Rapport Title')
    } else if (newRapportText === '') {
      return notifyError('Rapport Text')
    }
    const updatedTask = {
      ...task,
      reports: [...task.reports, { label: newRapportTitle, count: newRapportText }],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
    setCurrentTask(updatedTask)
  }

  const handleAddComment = () => {
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: {
          ...task,
          comments: [...task.comments, { text: newComment }],
        },
      }),
    )
  }

  const getColorByIndex = (index) => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    return colors[index % colors.length]
  }

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date))
  }

  const formatDate = (date) => {
    if (isValidDate(date)) {
      return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
    return '' // Fallback for invalid date
  }

  return (
    <>
      <ToastContainer />
      <CRow>
        <CCol>
          <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={img} alt="Trendy Pants and Shoes" className="img-fluid rounded-start" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Task Details</h5>
                  <p className="card-text">
                    <strong>Task Name:</strong> {currentTask.taskName}
                  </p>
                  <p className="card-text">
                    <strong>Task Owner:</strong> {currentTask.taskOwner}
                  </p>
                  <p className="card-text">
                    <strong>Target Date:</strong>{' '}
                    {currentTask.targetDate ? formatDate(currentTask.targetDate) : 'No target date set'}
                  </p>

                  <p className="card-text">
                    <strong>Status:</strong> {currentTask.status}
                  </p>
                  {task.status === 'inProgress' ? (
                    <CFormCheck
                      className="mb-3"
                      style={{ display: task.status === 'notStarted' ? 'none' : 'block' }}
                      id="flexCheckChecked"
                      label={'I have Completed The Task'}
                      checked={task.status === 'completed' ? true : false}
                      onChange={handleToggleTaskStatus}
                    />
                  ) : (
                    <p className=" text-center text-success">this Task is {currentTask.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark text-light">Resources</CCardHeader>
            <CCardBody>
              <div>
                <h5>{currentTask.taskName} Resources:</h5>
                <CListGroup>
                  {currentTask.resources.map((resource, index) => (
                    <CListGroupItem key={index}>
                      <CButton href={resource.url} download color="link">
                        {resource.fileName}
                      </CButton>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mt-3 mb-3">
        <CCardHeader className="bg-dark text-light">Sections</CCardHeader>
        <CCardBody>
          <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">KPIs</CCardHeader>
            <CCardBody>
              <CListGroup>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {currentTask.kpis.map((kpi, index) => (
                    <div
                      key={index}
                      className={`card text-bg-${getColorByIndex(index)} mb-3`}
                      style={{ minWidth: '260px', marginRight: '10px' }}
                    >
                      <div
                        className="card-header"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        KPI-{index} <IoClose />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{kpi.label}</h5>
                        <p className="card-text">{kpi.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <CListGroupItem>
                  <label htmlFor="newKpiLabel">Label:</label>
                  <CFormInput
                    id="newKpiLabel"
                    placeholder="KPI Label"
                    value={newKpiLabel}
                    onChange={(e) => setNewKpiLabel(e.target.value)}
                    className="mt-3 mb-3"
                  />
                  <label htmlFor="newKpiValue">Value:</label>
                  <CFormInput
                    id="newKpiValue"
                    placeholder="KPI Value"
                    value={newKpiValue}
                    onChange={(e) => setNewKpiValue(e.target.value)}
                    className="mt-3 mb-3"
                  />
                  <CButton
                    style={{ backgroundColor: '#00cc99' }}
                    onClick={() => handleAddKpi()}
                    className="mt-3 mb-3"
                  >
                    Add KPI
                  </CButton>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">Documents</CCardHeader>
            <CCardBody>
              <CListGroup>
                {currentTask.deliverables.map((deliverable, index) => (
                  <CListGroupItem key={index}>
                    <CButton onClick={() => handleDownload(deliverable.fileUrl)} color="link">
                      {deliverable.fileName}
                    </CButton>
                  </CListGroupItem>
                ))}
                <CListGroupItem>
                  <CForm onSubmit={handleAddDeliverable}>
                    <label htmlFor="newDeliverableName">Name:</label>
                    <CFormInput
                      id="newDeliverableName"
                      placeholder="Deliverable Name"
                      value={newDeliverableName}
                      onChange={(e) => setNewDeliverableName(e.target.value)}
                    />
                    <label htmlFor="newDeliverableFile" className="mt-3 mb-3">
                      Upload File:
                    </label>
                    <input
                      id="newDeliverableFile"
                      name="deliverableFile" // Ensure this name matches the one expected by Multer
                      type="file"
                      onChange={(e) => {
                        console.log('Selected deliverable file:', e.target.files[0])
                        setDeliverableFile(e.target.files[0])
                      }}
                    />
                    <CButton
                      style={{ backgroundColor: '#00cc99' }}
                      type="submit"
                      className="mt-3 mb-3"
                    >
                      Add Deliverable
                    </CButton>
                  </CForm>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>


          <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">Reporting Section</CCardHeader>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              {currentTask.reports.map((report, index) => (
                <div
                  style={{ minWidth: '300px', margin: '10px' }}
                  className={`card radius-10 border-start border-0 border-3 border-${getColorByIndex(index)} shadow`}
                >
                  <IoClose
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      fontSize: '20px',
                      margin: '5px',
                    }}
                  />
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">{report.label}</p>
                        <p className="mb-0 font-13">{report.count}</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                        <i className="fa fa-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CCardBody>
              <CFormInput
                placeholder="Title"
                value={newRapportTitle}
                onChange={(e) => setNewRapportTitle(e.target.value)}
                className="mb-3"
              />
              <CFormTextarea
                placeholder="Text"
                value={newRapportText}
                onChange={(e) => setNewRapportText(e.target.value)}
                className="mt-3 mb-3"
              />
              <CButton
                style={{ backgroundColor: '#00cc99' }}
                onClick={() => handleAddRapport()}
                className="mt-3 mb-3"
              >
                Add Reporting Section
              </CButton>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">Comment Section</CCardHeader>
            <CCardBody>
              <CommentSection />
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Task
