// EntrepreneurDetails.js
import { Link } from 'react-router-dom' // Import Link component
import React, { useEffect } from 'react'
import { CTable, CButton } from '@coreui/react'
import { useSelector } from 'react-redux'
const AllContactsCtable = () => {
  const entrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs)
  console.log(entrepreneurs)
  return (
    <CTable responsive>
      {/* Table header */}
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Entrepreneur Name</th>
          <th>startupName</th>
          <th>Activites sector</th>
          <th>Tel</th>
          <th>Mail</th>
          <th></th> {/* See More button */}
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {entrepreneurs.map((entrepreneur) => (
          <tr key={entrepreneur._id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              {entrepreneur.nom} {entrepreneur.prenom}
            </td>
            <td>{entrepreneur.startupName}</td>
            <td>{entrepreneur.secteurActivites}</td>
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
  )
}
export default AllContactsCtable
