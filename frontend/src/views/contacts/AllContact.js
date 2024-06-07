import React, { useEffect , useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
} from '@coreui/react';
import AllContactsCtable from '../../components/contacts/AllContactsCtable';
import { FcContacts } from "react-icons/fc";


const AllContacts = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const entrepreneurs = useSelector((state) =>state.entrepreneurs.entrepreneurs)

  const filteredEntrepreneurs = entrepreneurs?.filter((entrepreneur) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      entrepreneur.nom?.toLowerCase().includes(searchTermLowerCase) ||
      entrepreneur.prenom?.toLowerCase().includes(searchTermLowerCase) ||
      entrepreneur.startupName?.toLowerCase().includes(searchTermLowerCase) ||
      entrepreneur.secteurActivites?.toLowerCase().includes(searchTermLowerCase) ||
      entrepreneur.email?.toLowerCase().includes(searchTermLowerCase)
    );
  });
  return (
    <CContainer className="my-4">
      <CCard>
        <CCardHeader  style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }}>
        <h4 style={{ display: 'flex', alignItems: 'center'}}>
           <FcContacts style={{fontSize :"40px"}}/>
            All Contacts
          </h4>
        <CFormInput
            type="text"
            placeholder="Search Entrepreneurs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{maxWidth: '300px' , marginRight: '10px'}}
          />
        </CCardHeader>
        <CCardBody>
        <AllContactsCtable entrepreneurs={filteredEntrepreneurs} />
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default AllContacts;
