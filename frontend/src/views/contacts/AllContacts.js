import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { CContainer, CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow, CButton, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell } from '@coreui/react';
import { FcContacts } from "react-icons/fc";
import AdvancedFilter from './AdvancedFilter';

const AllContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const allContacts = useSelector((state) =>state.entrepreneurs.entrepreneurs)

  useEffect(() => {
    // Filtering common properties for all types of contacts
    const filtered = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [allContacts, searchTerm]);

  return (
    <div>
     
    <CContainer className="my-4">
     
      <CRow className="mb-4">
        <CCol>
          <Link to="/dash/entrepeneurs">
            <CButton color="primary" className="me-2">Entrepreneurs</CButton>
          </Link>
          <Link to="/coaches">
            <CButton color="primary" className="me-2">Coaches</CButton>
          </Link>
          <Link to="/investors">
            <CButton color="primary" className="me-2">Investors</CButton>
          </Link>
          <Link to="/mentors">
            <CButton color="primary" className="me-2">Mentors</CButton>
          </Link>
          <Link to="/project-holders">
            <CButton color="primary">Project Holders</CButton>
          </Link>
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ display: 'flex', alignItems: 'center' }}>
            <FcContacts style={{ fontSize: "40px" }} />
            All Contacts
          </h4>
          <CFormInput
            type="text"
            placeholder="Search Contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px', marginRight: '10px' }}
          />
        </CCardHeader>
        <CCardBody>
          <CTable striped responsive>
            <CTableHead>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Phone Number</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <CTableDataCell>{contact.name}</CTableDataCell>
                  <CTableDataCell>{contact.lastName}</CTableDataCell>
                  <CTableDataCell>{contact.phoneNumber}</CTableDataCell>
                  <CTableDataCell>{contact.role}</CTableDataCell>
                  <CTableDataCell>{contact.gender}</CTableDataCell>
                  <CTableDataCell>{contact.email}</CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/profile/${contact.id}`}>
                      <CButton color="primary">View Profile</CButton>
                    </Link>
                  </CTableDataCell>
                </tr>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
    </div>
  );
};

export default AllContacts;
