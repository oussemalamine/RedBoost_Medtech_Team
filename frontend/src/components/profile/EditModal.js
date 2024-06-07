import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap'
import axiosInstance from '../../axiosInstance'
import { useSelector } from 'react-redux'
const EditProfileModal = ({ setUpdateLog, isOpen, setIsOpen }) => {
  const [editedData, setEditedData] = useState([])
  const user = useSelector((state) => state.userData.userData)
/*  const handleConfirm = async () => {
    try {
      const updatedData = {}
      editedData.forEach((field) => {
        updatedData[field] = user[field]
      })
      const response = await axiosInstance.put(`/users/${user._id}`, updatedData)
      if (response.status === 200) {
        console.log('User updated successfully:', response.data)
        if (editedData.length > 0) {
          // Check if editedData is not empty
          editedData.forEach((element) => {
            const currentDate = new Date().toLocaleDateString()
            setUpdateLog((prevUpdateLog) => {
              const updatedLogs = [...prevUpdateLog]
              const existingLogIndex = updatedLogs.findIndex((log) => log.date === currentDate)
              if (existingLogIndex !== -1) {
                updatedLogs[existingLogIndex].events.push(
                  `User update ${element} at ${new Date().toLocaleTimeString()}`,
                )
              } else {
                updatedLogs.push({
                  date: currentDate,
                  events: [`User update ${element} at ${new Date().toLocaleTimeString()}`],
                })
              }
              return updatedLogs
            })
          })
        }
        setEditedData(null)
      } else {
        console.error('Failed to update user:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating user:', error.message)
    }
    setIsOpen(false)
  }*/
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedData((prev) => {
      if (prev === null) return [name]
      const index = prev.indexOf(name)
      if (index !== -1) {
        // If name exists, update it
        const updatedData = [...prev]
        updatedData[index] = name
        return updatedData
      } else {
        return [...prev, name]
      }
    })
  }

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} size="lg">
      {' '}
      {/* 'lg' for large modal on large screens */}
      <ModalHeader toggle={() => setIsOpen(false)}>Edit Profile</ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="bioInput">Bio</Label>
                <Input type="textarea" id="bioInput" name="bio" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="linkedinInput">LinkedIn</Label>
                <Input type="text" id="linkedinInput" name="linkedIn" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="linkedinInput">BeHance Link:</Label>
                <Input type="text" id="behnaceInput" name="behance" onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" >
          Save
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditProfileModal
