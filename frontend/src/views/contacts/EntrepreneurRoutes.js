import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EntrepreneurDetails from './EntrepreneurDetails';

const EntrepreneurRoutes = () => {
  return (
    <Routes>
      <Route
        path="/Dash/allContacts/entrepreneur/:entrepreneurId"
        element={<EntrepreneurDetails />}
      />
    </Routes>
  );
};

export default EntrepreneurRoutes;
