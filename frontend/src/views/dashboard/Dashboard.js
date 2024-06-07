import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import userAvatar from '../../components/Images/user.png'

const Dashboard = () => {
  const users = useSelector((state) => state.usersSlice.users)
  console.log('users : ', users)

  return (
    <>
      {/* Top Cards */}
      <WidgetsDropdown users={users} className="mb-4" />
      
      {/* Online Users Section */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Online Users</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Birthday</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Phone</CTableHeaderCell>
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
                      <CTableDataCell className="text-center">{user.birthday}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell className="text-center">{user.phone}</CTableDataCell>
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
      </CRow>
      
      {/* Main Chart */}
      <MainChart/>
    </>
  )
}

export default Dashboard
