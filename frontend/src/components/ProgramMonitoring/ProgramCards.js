import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../axiosInstance';
import { createProgram,loadPrograms } from '../../app/features/programs/programsSlice';
import { ProgramCard } from '../../components/ProgramCard';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
} from '@coreui/react';

const MAX_FILE_SIZE = 2097152; // 2 MB

export default function ProgramCards() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersSlice.users);
  const currentUser = useSelector((state) => state.userData.userData);
  const programs = useSelector((state) => state.programsSlice.programs);
  console.log('users', users);
  console.log('currentUser', currentUser);
  const [logoName, setLogoName] = useState('');
  const [logo, setLogo] = useState(null);
  const [programId, setprogramId] = useState(null);
  const [programTitle, setProgramTitle] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [programLead, setProgramLead] = useState('');
  const [visible, setVisible] = useState(false);

  console.log('programs', programs);

  const fileInputRef = useRef(null);

  const handleChangeEndDate = (date) => {
    if (date < startDate) {
      alert('End date must be greater than start date');
    } else {
      setEndDate(date);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Dispatch createProgram and then loadPrograms after the program is successfully created
  const addNewProgram = () => {
    if (
      logo === null ||
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
    console.log('logo', logo);
    formData.append('logo', logo);
    axiosInstance
      .post('/uploadLogo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('response', response);
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
        console.log('error', error);
      });

    setVisible(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the maximum limit of 2MB');
      return;
    }
    setLogo(file);
    setLogoName(file.name);
  };

  return (
    <>
      {currentUser.role === 'superAdmin' && (
        <div className="text-end">
          <CButton
            className="mb-3"
            color="primary"
            style={{
              backgroundColor: '#B42222',
              borderColor: '#B42222',
              color: 'white',
              width: '150px',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setVisible(!visible)}
          >
            <i className="bi bi-plus-square" style={{ marginRight: '8px' }}></i>
            Add Program
          </CButton>
        </div>
      )}

      <CModal
        fullscreen-md-down="true"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="FullscreenExample1"
      >
        <CModalHeader>
          <CModalTitle id="FullscreenExample1" style={{ color: 'Black' }}>Add Program</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            {/* Form Inputs */}
          </CForm>
        </CModalBody>
      </CModal>

      {/* Program Cards */}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {programs.map((program, index) => (
              <CCol key={index} xs={12} sm={6} md={4} lg={3}>
                <ProgramCard
                  key={program._id}
                  logo={program.logo}
                  title={program.programTitle}
                  Link to={`${window.location.pathname}/${program.programTitle}`}
                  path={`/program/${program._id}`}
                  programId={program._id}
                />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
}
