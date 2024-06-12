import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPeople } from '@coreui/icons';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import userAvatar from '../../components/Images/user.png';

import './Dashboard.css'; 
import TaskCalendar from './TaskCalendar'
import TaskList from './TaskList';

const Dashboard = () => {
  const users = useSelector((state) => state.usersSlice.users);
  console.log('users : ', users);

  return (
    <>
      {/* Top Cards */}
      <WidgetsDropdown users={users} className="mb-4" />

      {/* Online Users Section */}
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Online Users</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border table-sm" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Points</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar
                          size="md"
                          src={user.image.length > 0 ? user.image : userAvatar}
                          status="success"
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{user.username}</div>
                      </CTableDataCell>
                      {/* Display updated points */}
                      <CTableDataCell className="text-center">{user.exp}</CTableDataCell>
                      {/* End of displaying updated points */}
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{user.role}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Calendar</CCardHeader>
            <CCardBody>
              <TaskCalendar/>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Task List</CCardHeader>
            <CCardBody>
              <TaskList/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>

  );
};

export default Dashboard;
