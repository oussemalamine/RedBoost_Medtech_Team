import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CButton,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProgram } from '../../src/app/features/programs/programsSlice';
import {updateProgram} from '../../src/app/features/programs/programsSlice';

export const ProgramCard = ({ logo, title, programId, onEdit }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userData.userData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const path = `${window.location.pathname}/${title}`;

  return (
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
      <CModal visible={showDeleteModal} onClose={handleCancelDelete}>
        <CModalHeader closeButton>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this program?
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleConfirmDelete}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={handleCancelDelete}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};
