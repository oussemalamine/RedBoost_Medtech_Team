import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react';

const EntrepreneurEdit = ({ visible, setVisible, entrepreneur }) => {
  const dispatch = useDispatch();

  const [editedName, setEditedName] = useState(entrepreneur.nom);
  const [editedBio, setEditedBio] = useState(entrepreneur.bio);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleBioChange = (e) => {
    setEditedBio(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveChanges = () => {
    // Prepare updated entrepreneur object with only name and bio fields
    const updatedEntrepreneur = {
      ...entrepreneur,
      nom: editedName,
      bio: editedBio,
    };

   

    setVisible(false); // Close modal after saving
  };

  if (!entrepreneur) return null;

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="EntrepreneurEditModal"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle>Edit Entrepreneur</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <CFormLabel htmlFor="name">Name:</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={editedName}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="bio">Bio:</CFormLabel>
          <CFormTextarea
            id="bio"
            name="bio"
            placeholder="Enter bio"
            value={editedBio}
            onChange={handleBioChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="file">Avatar:</CFormLabel>
          <CFormInput
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary"  onClick={() => setVisible(false)}>Cancel</CButton>
        <CButton color="primary" onClick={handleSaveChanges}>Save</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EntrepreneurEdit;
