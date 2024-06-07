import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CFormLabel,
} from '@coreui/react';

const AdvancedFilter = ({ entrepreneurs, onFilterUpdate }) => {
  const [filters, setFilters] = useState({
    sector: '',
    gender: '',
    region: '',
    ageMin: '',
    ageMax: '',
    gouvernorat: '',
    nom: '',
    prenom: '',
    // ... add other filters as needed
  });

  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [gouvernorats, setGouvernorats] = useState([]);

  useEffect(() => {
    const uniqueSectors = [...new Set(entrepreneurs.map(e => e.secteurActivites))];
    const uniqueRegions = [...new Set(entrepreneurs.map(e => e.region))];
    const uniqueGouvernorats = [...new Set(entrepreneurs.map(e => e.gouvernorat))];
    setSectors(uniqueSectors);
    setRegions(uniqueRegions);
    setGouvernorats(uniqueGouvernorats);
  }, [entrepreneurs]);

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    onFilterUpdate(filters); // Call callback to update parent component with filters
  };

  return (
    <CCard>
      <CCardHeader className="bg-dark text-light">Advanced Filter</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleFilterSubmit}>
          <CRow>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="sector">Sector</CFormLabel>
                <CFormSelect name="sector" value={filters.sector} onChange={handleFilterChange}>
                  <option value="">All Sectors</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </CFormSelect>
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="gender">Gender</CFormLabel>
                <CFormSelect name="gender" value={filters.gender} onChange={handleFilterChange}>
                  <option value="">All Genders</option>
                  <option value="homme">Male</option>
                  <option value="femme">Female</option>
                </CFormSelect>
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="region">Region</CFormLabel>
                <CFormSelect name="region" value={filters.region} onChange={handleFilterChange}>
                  <option value="">All Regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </CFormSelect>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="ageMin">Min Age</CFormLabel>
                <CFormInput
                  type="number"
                  name="ageMin"
                  value={filters.ageMin}
                  placeholder="Min Age"
                  onChange={handleFilterChange}
                />
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="ageMax">Max Age</CFormLabel>
                <CFormInput
                  type="number"
                  name="ageMax"
                  value={filters.ageMax}
                  placeholder="Max Age"
                  onChange={handleFilterChange}
                />
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="gouvernorat">Gouvernorat</CFormLabel>
                <CFormSelect name="gouvernorat" value={filters.gouvernorat} onChange={handleFilterChange}>
                  <option value="">All Gouvernorats</option>
                  {gouvernorats.map((gouvernorat) => (
                    <option key={gouvernorat} value={gouvernorat}>{gouvernorat}</option>
                  ))}
                </CFormSelect>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="nom">Nom</CFormLabel>
                <CFormInput
                  type="text"
                  name="nom"
                  value={filters.nom}
                  placeholder="Nom"
                  onChange={handleFilterChange}
                />
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="prenom">Prenom</CFormLabel>
                <CFormInput
                  type="text"
                  name="prenom"
                  value={filters.prenom}
                  placeholder="Prenom"
                  onChange={handleFilterChange}
                />
              </div>
            </CCol>
          </CRow>
          <CButton type="submit" color="primary">Apply Filters</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AdvancedFilter;
