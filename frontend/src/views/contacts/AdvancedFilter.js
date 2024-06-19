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
import { cilSearch } from '@coreui/icons';

const AdvancedFilter = ({ entrepreneurs, onFilterUpdate }) => {
  const [filters, setFilters] = useState({
    sector: '',
    male: true, // Default checked
    female: true, // Default checked
    region: '',
    gouvernorat: '',
    search: ''
  });

  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [gouvernorats, setGouvernorats] = useState([]);
  const [atLeastOneGenderChecked, setAtLeastOneGenderChecked] = useState(true);
  const [filteredEntrepreneurs, setFilteredEntrepreneurs] = useState([]);

  useEffect(() => {
    const uniqueSectors = [...new Set(entrepreneurs.map((e) => e.secteurActivites))];
    const uniqueRegions = [...new Set(entrepreneurs.map((e) => e.region))];
    const uniqueGouvernorats = [...new Set(entrepreneurs.map((e) => e.gouvernorat))];
    setSectors(uniqueSectors);
    setRegions(uniqueRegions);
    setGouvernorats(uniqueGouvernorats);
  }, [entrepreneurs]);

  useEffect(() => {
    // Check if at least one gender checkbox is checked
    setAtLeastOneGenderChecked(filters.male || filters.female);
  }, [filters.male, filters.female]);

  useEffect(() => {
    // Filter entrepreneurs based on search input
    const filtered = entrepreneurs.filter(entrepreneur =>
      Object.values(entrepreneur).some(val =>
        val.toString().toLowerCase().includes(filters.search.toLowerCase())
      )
    );
    setFilteredEntrepreneurs(filtered);
  }, [filters.search, entrepreneurs]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleGenderChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    onFilterUpdate(filters);
  };

  return (
    <CCard className="mb-4 shadow">
      <CCardHeader className="bg-primary text-white">Advanced Filter</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleFilterSubmit}>
          <CRow className="mb-3">
            <CCol md="4">
              <CFormLabel htmlFor="sector">Sector</CFormLabel>
              <CFormSelect name="sector" value={filters.sector} onChange={handleFilterChange}>
                <option value="">All Sectors</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md="4">
              <CFormLabel>Gender</CFormLabel>
              <div>
                <input
                  type="checkbox"
                  id="male"
                  name="male"
                  checked={filters.male}
                  onChange={handleGenderChange}
                />
                <label htmlFor="male" className="mx-2">
                  Male
                </label>
                <input
                  type="checkbox"
                  id="female"
                  name="female"
                  checked={filters.female}
                  onChange={handleGenderChange}
                />
                <label htmlFor="female" className="mx-2">
                  Female
                </label>
              </div>
            </CCol>
            <CCol md="4">
              <CFormLabel htmlFor="region">Region</CFormLabel>
              <CFormSelect name="region" value={filters.region} onChange={handleFilterChange}>
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CFormLabel htmlFor="search">Search</CFormLabel>
              <div className="input-group">
                <CFormInput
                  type="text"
                  id="search"
                  name="search"
                  className="form-control"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
                <CButton type="submit" color="primary" className="input-group-text">
                  <svg className="icon">
                    <use xlinkHref={cilSearch}></use>
                  </svg>
                </CButton>
              </div>
            </CCol>
          </CRow>
          <CButton
            type="submit"
            color="primary"
            className="mt-3"
            disabled={!atLeastOneGenderChecked}
          >
            Apply Filters
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AdvancedFilter;
