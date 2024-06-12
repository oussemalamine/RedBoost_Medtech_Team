import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CTable, CButton, CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react';
import { Link } from 'react-router-dom';
import AdvancedFilter from '../contacts/AdvancedFilter.js'
import {ImportExport} from '../ImportExportEntrepeneur/importExport.js'

const EntrepreneursTable = () => {
  const allEntrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs);
  const [filteredEntrepreneurs, setFilteredEntrepreneurs] = useState(allEntrepreneurs);

  useEffect(() => {
    setFilteredEntrepreneurs(allEntrepreneurs); // Initialize filtered entrepreneurs with all entrepreneurs
  }, [allEntrepreneurs]);

  const handleFilterUpdate = (filters) => {
    let filtered = allEntrepreneurs;

    if (filters.sector) {
      filtered = filtered.filter(e => e.secteurActivites === filters.sector);
    }
    if (filters.gender) {
      filtered = filtered.filter(e => e.gender === filters.gender);
    }
    if (filters.region) {
      filtered = filtered.filter(e => e.region === filters.region);
    }
    if (filters.ageMin) {
      filtered = filtered.filter(e => e.age >= filters.ageMin);
    }
    if (filters.ageMax) {
      filtered = filtered.filter(e => e.age <= filters.ageMax);
    }
    if (filters.gouvernorat) {
      filtered = filtered.filter(e => e.gouvernorat === filters.gouvernorat);
    }
    if (filters.nom) {
      filtered = filtered.filter(e => e.nom.toLowerCase().includes(filters.nom.toLowerCase()));
    }
    if (filters.prenom) {
      filtered = filtered.filter(e => e.prenom.toLowerCase().includes(filters.prenom.toLowerCase()));
    }

    setFilteredEntrepreneurs(filtered);
  };



  return (
    <div>
      
      <AdvancedFilter entrepreneurs={allEntrepreneurs} onFilterUpdate={handleFilterUpdate} />
      <ImportExport/>
      <CCard className=' mt-2'>
        <CCardHeader className="bg-dark text-light">Entrepreneurs</CCardHeader>
        <CCardBody>
          
          <CTable responsive>
            {/* Table header */}
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Entrepreneur Name</th>
                <th>Startup Name</th>
                <th>Activities Sector</th>
                <th>Tel</th>
                <th>Mail</th>
                <th></th> {/* See More button */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {filteredEntrepreneurs.map((entrepreneur) => (
                <tr key={entrepreneur._id}>
                  <td><input type="checkbox" /></td>
                  <td>{entrepreneur.nom} {entrepreneur.prenom}</td>
                  <td>{entrepreneur.startupName}</td>
                  <td>{entrepreneur.secteurActivites}</td>
                  <td>{entrepreneur.tel}</td>
                  <td>{entrepreneur.email}</td>
                  <td>
                    <Link to={`${entrepreneur._id}`}>
                      <CButton color="primary">See More</CButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default EntrepreneursTable;
