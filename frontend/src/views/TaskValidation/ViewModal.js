import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask,loadTask } from '../../app/features/task/taskSlice'

function ViewModal({ showModal, setShowModal, selectedTask, setSelectedTask }) {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedTask = { ...selectedTask, [name]: value }
    setSelectedTask(updatedTask)
  }

  const handleSubmit = () => {
    const { _id, ...taskData } = selectedTask
    dispatch(updateTask({ taskId: _id, taskData }))
    setShowModal(false)
  }

  const handleDelete = () => {
    dispatch(deleteTask(selectedTask._id))
    setShowModal(false)
  }

  const handleValidate = () => {
    dispatch(
      updateTask({ taskId: selectedTask._id, taskData: { ...selectedTask, status: 'valid' } }),
    )
    setShowModal(false)
  }

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date))
  }

  const formatDate = (date) => {
    if (isValidDate(date)) {
      return new Date(date).toISOString().substring(0, 10)
    }
    return '' // Fallback for invalid date
  }

  return (
    <CModal
      visible={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="LiveDemoExampleLabel"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle id="LiveDemoExampleLabel">View Task</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '450px', overflow: 'auto' }} className="modal-body">
        <div className="mb-3">
          <CFormInput
            type="text"
            id="taskTitle"
            name="taskName"
            placeholder="Task Title"
            aria-describedby="taskTitleHelpInline"
            value={selectedTask.taskName}
            onChange={handleChange}
            disabled // Make the input field disabled
          />
        </div>
        <div className="mb-3">
          <CFormSelect
            value={selectedTask.status}
            id="taskStatus"
            name="status"
            onChange={handleChange}
            className={selectedTask.status === 'valid' ? 'status-valid' : selectedTask.status === 'completed' ? 'status-completed' : ''}
          >
            <option value="inProgress">In Progress</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="valid">Validated</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormInput
            value={formatDate(selectedTask.targetDate)}
            type="date"
            name="targetDate"
            id="taskDate"
            placeholder="Task Date"
            onChange={handleChange}
            disabled // Make the input field disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="xpPoints" className="form-label">
            Enter your XP points score !!!!
          </label>
          <CFormInput
            value={selectedTask.xpPoints}
            type="number"
            name="xpPoints"
            id="xpPoints"
            placeholder="XP Points"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <h5>Task Evidence</h5>
          <div className='Kpis'><h6>Kpi's</h6>
          {selectedTask.kpis ? (
            selectedTask.kpis.length > 0 ? (
              <ul>
                {selectedTask.kpis.map((attachment, index) => (
                  <li key={index}>
                    <a target="_blank" rel="noopener noreferrer">
                      {attachment.label} = {attachment.count}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attachments found.</p>
            )
          ) : (
            <p>Couldn't access the kpi's of this task.</p>
          )}</div>
          <div className='Reports'><h6>Reports</h6>
          {selectedTask.reports ? (
            selectedTask.reports.length > 0 ? (
              <ul>
                {selectedTask.reports.map((attachment, index) => (
                  <li key={index}>
                    <a target="_blank" rel="noopener noreferrer">
                      {attachment.label} = {attachment.count}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attachments found.</p>
            )
          ) : (
            <p>Couldn't access the reports of this task.</p>
          )}</div>
          <div className='Deliverables'>
          <h6>Deliverables</h6>
          {selectedTask.deliverables ? (
            selectedTask.deliverables.length > 0 ? (
              <ul>
                {selectedTask.deliverables.map((attachment, index) => (
                  <li key={index}>
                    <a href={attachment.fileUrl} target="_blank" rel="noopener noreferrer">
                      {attachment.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attachments found.</p>
            )
          ) : (
            <p>Couldn't access the deliverables of this task.</p>
          )}
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={handleDelete}>
          Delete
        </CButton>
        <CButton color="secondary" onClick={() => setShowModal(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save
        </CButton>
        <CButton color="success" onClick={handleValidate}>
          Validate
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ViewModal
