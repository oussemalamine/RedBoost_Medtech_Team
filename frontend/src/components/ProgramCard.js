import React, { useState, useRef } from 'react';
import {
  CCard,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
  CCol,
  CListGroupItem,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProgram, createProgram } from '../../src/app/features/programs/programsSlice';

const MAX_FILE_SIZE = 2097152; // 2 MB

export const ProgramCard = ({ logo, title, programId, onEdit }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userData.userData);
  const users = useSelector((state) => state.usersSlice.users);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [logoName, setLogoName] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [programTitle, setProgramTitle] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [programLead, setProgramLead] = useState('');
  const fileInputRef = useRef(null);

  const handleTrashClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProgram(programId));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handlePencilClick = () => {
    onEdit(programId);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the maximum limit of 2MB');
      return;
    }
    setLogoFile(file);
    setLogoName(file.name);
  };

  const handleChangeEndDate = (date) => {
    if (date < startDate) {
      alert('End date must be greater than start date');
    } else {
      setEndDate(date);
    }
  };

  const addNewProgram = () => {
    if (
      logoFile === null ||
      programTitle === '' ||
      programDescription === '' ||
      startDate === '' ||
      endDate === '' ||
      budget === '' ||
      programLead === ''
    ) {
      alert('Please fill all the fields');
      return;
    }
    const formData = new FormData();
    formData.append('logo', logoFile);
    axiosInstance
      .post('/uploadLogo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const programData = {
            programTitle,
            programDescription,
            startDate,
            endDate,
            budget,
            authorizedUsers: [programLead],
            logo: response.data.secure_url,
          };
          dispatch(createProgram(programData));
        }
      })
      .catch((error) => {
        console.error('Error uploading logo:', error);
      });
    setShowAddProgramModal(false);
  };

  const path = `${window.location.pathname}/${title}`;

  return (
    <>
      <CCard className="mb-4" style={{ marginTop: '40px' }}>
        <CCardBody className="d-flex flex-column align-items-center">
          <div className="mb-4 w-100">
            <h5 className="text-center mb-2">{title}</h5>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '120px', flex: 1 }}>
              <img src={logo} alt="Project Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-auto w-100">
            {currentUser.role === 'superAdmin' && (
              <>
                <CButton className="text-danger me-2" onClick={handleTrashClick}>
                  <i className="bi bi-trash"></i>
                </CButton>
                <CButton className="me-2" style={{ background: '#282434', border: 'none' }}>
                  <CListGroupItem as={Link} to={path} className="text-light text-decoration-none">
                    <i className="bi bi-search me-2"></i>
                    View
                  </CListGroupItem>
                </CButton>
                <CButton className="text-primary" onClick={handlePencilClick}>
                  <i className="bi bi-pencil"></i>
                </CButton>
                
              </>
            )}
          </div>
        </CCardBody>
      </CCard>

      <CModal visible={showDeleteModal} onClose={handleCancelDelete}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this program?</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleConfirmDelete}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={handleCancelDelete}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={showAddProgramModal} onClose={() => setShowAddProgramModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Add Program</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3 border rounded">
              <CButton color="primary" onClick={handleButtonClick}>
                Choose Logo
              </CButton>
              <CCol className="d-flex align-items-center justify-content-center">
                <CFormInput
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  type="file"
                  id="logo"
                  name="logo"
                  placeholder="Enter logo"
                  onChange={handleImageChange}
                />
                {!logoName && <span className="logo-name">...</span>}
                {logoName && <span className="logo-name">{logoName}</span>}
              </CCol>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon2">@</CInputGroupText>
              <CFormInput
                id="program name"
                placeholder="Program Name"
                aria-label="Program Name"
                aria-describedby="basic-addon2"
                onChange={(e) => setProgramTitle(e.target.value)}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CFormTextarea
                type="text-area"
                id="program description"
                placeholder="Program Description"
                aria-label="Program Description"
                aria-describedby="basic-addon2"
                onChange={(e) => setProgramDescription(e.target.value)}
              />
            </CInputGroup>

            <CCol className="mb-3 d-flex gap-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon2">Start Date</CInputGroupText>
                <CFormInput
                  type="date"
                  id="start date"
                  placeholder="Enter start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText id="basic-addon2">End Date</CInputGroupText>
                <CFormInput
                  type="date"
                  id="end date"
                  placeholder="Enter end date"
                  value={endDate}
                  onChange={(e) => handleChangeEndDate(e.target.value)}
                />
              </CInputGroup>
            </CCol>
            <CInputGroup className="mb-3">
              <CInputGroupText>$</CInputGroupText>
              <CFormInput
                type="number"
                id="budget"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <CInputGroupText>.00</CInputGroupText>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CFormSelect
                id="programLead"
                value={programLead}
                onChange={(e) => setProgramLead(e.target.value)}
                aria-label="Program Lead"
              >
                <option>Choose program lead</option>
                {users.map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.userName}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
        <CButton color="primary" onClick={addNewProgram}>
            Add Program
          </CButton>
          <CButton color="secondary" onClick={() => setShowAddProgramModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
