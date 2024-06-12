import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol, CButton, CSpinner, CAlert, CAvatar
} from '@coreui/react';
import InfoCard from './InfoCard';

const EntrepreneurDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.entrepreneurs.loading);
  const entrepreneur = useSelector(state => state.entrepreneurs.entrepreneurs.find(ent => ent._id === id));

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <CSpinner color="primary" size="lg" />
      </div>
    );
  }

  if (!entrepreneur) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <CAlert color="danger">Entrepreneur not found</CAlert>
      </div>
    );
  }

  const memberSince = moment(entrepreneur.joinedDate).fromNow();

  return (
    <div className="container mt-4">
      <div className="text-start m-2">
        <CButton color="primary" onClick={() => window.history.back()}>Back</CButton>
      </div>
      {/* Full-width card with avatar and name */}
      <CCard 
       textColor="secondary"
      className="mb-4 shadow-sm mb-3 border-top-secondary border-top-3"
     >
        <CCardBody 
        className="d-flex flex-column flex-md-row align-items-center">
          <CRow>
            <CCol md={3} className="mb-3 mb-md-0 px-md-3">
              <div className="text-center">
                <CAvatar
                  src="https://randomuser.me/api/portraits/women/3.jpg"
                  size="xxl"
                  className="rounded-circle shadow-lg border border-primary img-fluid w-100 h-100"
                />
              </div>
            </CCol>
            
            <CCol md={6} className="text-center text-md-start px-md-3">
              <div className="text-center text-md-start ms-md-4 m-4">
                <div className="name-container mb-2 m">
                  <h4>{entrepreneur.nom.charAt(0).toUpperCase() + entrepreneur.nom.slice(1)} {entrepreneur.prenom.charAt(0).toUpperCase() + entrepreneur.prenom.slice(1)}</h4>
                </div>
                <p className="text-muted mt-4 ">Role: {entrepreneur.role}</p>
                <p className="text-muted mb-0"><strong>Bio:</strong> <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum, odio nec pharetra fermentum, nulla tellus sollicitudin risus, nec pretium nunc ipsum et nisi.</p>
              </div>
            </CCol>

            <CCol md={3} className="text-center text-md-start px-md-3 mt-5 ">
              <p className="text-muted mt-mb-2 ">Member since {memberSince}</p>
              <p className="text-muted mt-mb-2">XP Points: {entrepreneur.xpPoints}</p>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Two cards side by side */}
      <CRow>
        <CCol xs={12} md={6}>
          <InfoCard
            title="Personal Information"
            info={[
              { label: 'Address', value: entrepreneur.adresse },
              { label: 'Email', value: entrepreneur.email },
              { label: 'Region', value: entrepreneur.region },
              { label: 'Gouvernorat', value: entrepreneur.gouvernorat },
              { label: 'Gender', value: entrepreneur.gender },
              { label: 'Date of Birth', value: moment(entrepreneur.dateDeNaissance).format('MMMM Do, YYYY') },
            ]}
          />
        </CCol>

        <CCol xs={12} md={6}>
          <InfoCard
            title="Startup Information"
            info={[
              { label: 'Startup Name', value: entrepreneur.startupName },
              { label: 'Description', value: entrepreneur.description },
              { label: 'Activities Sector', value: entrepreneur.secteurActivites },
              { label: 'Number of Co-founders', value: entrepreneur.nombreCofondateurs },
              { label: 'Number of Female Co-founders', value: entrepreneur.nombreCofondateursFemmes },
              { label: 'Created or Not', value: entrepreneur.creeeOuNon },
              { label: 'Legal Form', value: entrepreneur.formeJuridique },
              { label: 'Number of Jobs Created', value: entrepreneur.nombreEmploisCrees },
              { label: 'Project Cost', value: entrepreneur.coutProjet },
              { label: 'Disbursement Date', value: moment(entrepreneur.dateDecaissement).format('MMMM Do, YYYY') },
            ]}
          />
        </CCol>
      </CRow>
    </div>
  );
};

export default EntrepreneurDetails;
