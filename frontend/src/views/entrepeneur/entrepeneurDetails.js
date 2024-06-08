import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'; // For handling date and time
import { CTable, CButton, CCard, CCardBody, CCardHeader ,CAvatar, CCardTitle ,CRow ,CCol} from '@coreui/react';

const entrepeneurDetails = () => {
  const { id } = useParams(); // Get the entrepreneur ID from the URL
  const dispatch = useDispatch();
  const allEntrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs);
  const loading = useSelector((state) => state.entrepreneurs.loading);
  const entrepreneur = useSelector(state => state.entrepreneurs.entrepreneurs.find(entrepreneur => entrepreneur._id === id));

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!entrepreneur) {
    return <div>Entrepreneur not found</div>;
  }

  // Calculate how long the entrepreneur has been here
  const memberSince = moment(entrepreneur.joinedDate).fromNow();

  return (
    <div>
      {/* Full-width card with avatar and name */}
      <CCard className="mb-4">
  <CCardBody className="d-flex align-items-center">
   
    <img src="https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg" alt="Example Profile" width="200" height="200" />

    <div>
      <h5 className="fw-bold">{entrepreneur.nom} {entrepreneur.prenom}</h5>
      <div className="text-muted">Member since {memberSince}</div>
    </div>
  </CCardBody>
</CCard>


      {/* Two cards side by side */}
      <CRow>
        {/* Personal Information Card */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-dark text-light">Personal Information</CCardHeader>
            <CCardBody>
              <div className="mb-3"><strong>Address:</strong> {entrepreneur.adresse}</div>
              <div className="mb-3"><strong>Email:</strong> {entrepreneur.email}</div>
              <div className="mb-3"><strong>Region:</strong> {entrepreneur.region}</div>
              <div className="mb-3"><strong>Gouvernorat:</strong> {entrepreneur.gouvernorat}</div>
              <div className="mb-3"><strong>Age:</strong> {entrepreneur.age}</div>
              <div className="mb-3"><strong>Gender:</strong> {entrepreneur.gender}</div>
              <div className="mb-3"><strong>Date of Birth:</strong> {moment(entrepreneur.dateDeNaissance).format('MMMM Do, YYYY')}</div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Startup Information Card */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader className="bg-dark text-light">Startup Information</CCardHeader>
            <CCardBody>
              <div className="mb-3"><strong>Startup Name:</strong> {entrepreneur.startupName}</div>
              <div className="mb-3"><strong>Description:</strong> {entrepreneur.description}</div>
              <div className="mb-3"><strong>Activities Sector:</strong> {entrepreneur.secteurActivites}</div>
              <div className="mb-3"><strong>Number of Co-founders:</strong> {entrepreneur.nombreCofondateurs}</div>
              <div className="mb-3"><strong>Number of Female Co-founders:</strong> {entrepreneur.nombreCofondateursFemmes}</div>
              <div className="mb-3"><strong>Created or Not:</strong> {entrepreneur.creeeOuNon}</div>
              <div className="mb-3"><strong>Legal Form:</strong> {entrepreneur.formeJuridique}</div>
              <div className="mb-3"><strong>Number of Jobs Created:</strong> {entrepreneur.nombreEmploisCrees}</div>
              <div className="mb-3"><strong>Project Cost:</strong> {entrepreneur.coutProjet}</div>
              <div className="mb-3"><strong>Hours of Collective Training:</strong> {entrepreneur.nombreHeuresFormationCollective}</div>
              <div className="mb-3"><strong>Hours of Individual Training:</strong> {entrepreneur.nombreHeuresFormationIndividuelle}</div>
              <div className="mb-3"><strong>Funding Objectives:</strong> {entrepreneur.objectifsFinancement}</div>
              <div className="mb-3"><strong>Project Progress State:</strong> {entrepreneur.etatAvancementProjets}</div>
              <div className="mb-3"><strong>Other Funding:</strong> {entrepreneur.autreFinancement}</div>
              <div className="mb-3"><strong>Funding Organization:</strong> {entrepreneur.organismeFinancement}</div>
              <div className="mb-3"><strong>Disbursed Funding:</strong> {entrepreneur.financementDecaisse}</div>
              <div className="mb-3"><strong>Disbursement Date:</strong> {moment(entrepreneur.dateDecaissement).format('MMMM Do, YYYY')}</div>
              <div className="mb-3"><strong>Granted Funding Amount:</strong> {entrepreneur.montantFinancementAccorde}</div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CButton color="primary" onClick={() => window.history.back()}>Back</CButton>
    </div>
  );
};

export default entrepeneurDetails;
