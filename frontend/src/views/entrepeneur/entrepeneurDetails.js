import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CSpinner,
  CAlert,
  CAvatar,
} from '@coreui/react';
import InfoCard from './InfoCard';
import EditButtonPop from './popups/editButtonPop'; // Assuming your modal component is named EditButtonPop
import EntrepreneurEdit from './popups/entrepeneurEdit'; // Importing the EntrepreneurEdit modal component

const EntrepreneurDetails = () => {
  const { id } = useParams();
  const [editButtonPopVisible, setEditButtonPopVisible] = useState(false); // State to manage editButtonPop modal visibility
  const [entrepreneurEditVisible, setEntrepreneurEditVisible] = useState(false); // State to manage EntrepreneurEdit modal visibility

  const entrepreneur = useSelector((state) =>
    state.entrepreneurs.entrepreneurs.find((ent) => ent._id === id)
  );
  const loading = useSelector((state) => state.entrepreneurs.loading);

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

  const handleEditClick = () => {
    setEditButtonPopVisible(true); // Open the editButtonPop modal when Modify button is clicked
  };

  const handleEntrepreneurEditClick = () => {
    setEntrepreneurEditVisible(true); // Open the EntrepreneurEdit modal when Edit button is clicked
  };

  return (
    <div className="container mt-4">
      <div className="text-start m-2">
        <CButton color="primary" onClick={() => window.history.back()}>
          Back
        </CButton>
      </div>

      {/* editButtonPop Modal */}
      <EditButtonPop
        visible={editButtonPopVisible}
        setVisible={setEditButtonPopVisible}
        entrepreneur={entrepreneur} // Pass entrepreneur data to the editButtonPop modal
      />

      {/* EntrepreneurEdit Modal */}
      <EntrepreneurEdit
        visible={entrepreneurEditVisible}
        setVisible={setEntrepreneurEditVisible}
        entrepreneur={entrepreneur} // Pass entrepreneur data to the EntrepreneurEdit modal
      />

      {/* Full-width card with avatar and name */}
      <CCard className="mb-4 shadow-sm mb-3 border-top-secondary border-top-3">
        <CCardBody className="d-flex flex-column flex-md-row align-items-center">
          <CRow>
            <CCol md={3} className="mb-3 mb-md-0 px-md-3">
              <div className="text-center">
                <CAvatar
                  src="https://www.pngarts.com/files/5/User-Avatar-PNG-Picture.png"
                  size="xxl"
                  className="rounded-circle shadow-lg border border-primary img-fluid w-100 h-100"
                />
              </div>
            </CCol>

            <CCol md={6} className="text-center text-md-start px-md-3">
              <div className="text-center text-md-start ms-md-4 m-4">
                <div className="name-container mb-2 m">
                  <h4>
                    {entrepreneur.nom.charAt(0).toUpperCase() +
                      entrepreneur.nom.slice(1)}{' '}
                    {entrepreneur.prenom.charAt(0).toUpperCase() +
                      entrepreneur.prenom.slice(1)}
                  </h4>
                </div>
                <p className="text-muted mt-4">Entrepeneur</p>
                <p className="text-muted mb-0">
                  <strong>Bio:</strong> <br /> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed fermentum, odio nec
                  pharetra fermentum, nulla tellus sollicitudin risus, nec
                  pretium nunc ipsum et nisi.
                </p>
              </div>
            </CCol>

            <CCol md={3} className="text-center text-md-start px-md-3 mt-5">
              <p className="text-muted mt-mb-2">Member since {memberSince}</p>
              <p className="text-muted mt-mb-2">XP Points: {entrepreneur.xpPoints}</p>
            </CCol>
            <div className="text-end">
              <CButton color="secondary" onClick={handleEntrepreneurEditClick}>
                <FaEdit className="ml-2" style={{ cursor: 'pointer' }} />
              </CButton>
            </div>
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
              {
                label: 'Date of Birth',
                value: moment(entrepreneur.dateDeNaissance).format(
                  'MMMM Do, YYYY'
                ),
              },
            ]}
          />
        </CCol>

        <CCol xs={12} md={6}>
          <InfoCard
            title="Startup Information"
            info={[
              { label: 'Startup Name', value: entrepreneur.startupName },
              { label: 'Description', value: entrepreneur.description },
              {
                label: 'Activities Sector',
                value: entrepreneur.secteurActivites,
              },
              {
                label: 'Number of Co-founders',
                value: entrepreneur.nombreCofondateurs,
              },
              {
                label: 'Number of Female Co-founders',
                value: entrepreneur.nombreCofondateursFemmes,
              },
              { label: 'Created or Not', value: entrepreneur.creeeOuNon },
              { label: 'Legal Form', value: entrepreneur.formeJuridique },
              {
                label: 'Number of Jobs Created',
                value: entrepreneur.nombreEmploisCrees,
              },
              {
                label: 'Project Cost',
                value: entrepreneur.coutProjet,
              },
              {
                label: 'Disbursement Date',
                value: moment(entrepreneur.dateDecaissement).format(
                  'MMMM Do, YYYY'
                ),
              },
            ]}
          />
        </CCol>
      </CRow>
      <div className="text-center">
        <CButton color="primary" onClick={handleEditClick}>
          Modify
        </CButton>
      </div>
    </div>
  );
};

export default EntrepreneurDetails;
