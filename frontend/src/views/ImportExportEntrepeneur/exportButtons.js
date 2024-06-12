import React from 'react';
import { CButton } from '@coreui/react';

const ExportButtons = ({ onExportAll, onExportSelected, selectedCount }) => {
  
  const handleExportAll = () => {
    if (onExportAll) {
      onExportAll();
    }
  };

  const handleExportSelected = () => {
    if (onExportSelected) {
      onExportSelected();
    }
  };

  return (
    <div className="d-flex justify-content-between mb-3">
      <div>
        <CButton color="primary" onClick={handleExportAll}>Export All</CButton>
        <CButton color="primary" className="ml-2" onClick={handleExportSelected}>Export Selected</CButton>
      </div>
      <div>
        <p>{selectedCount} selected</p>
      </div>
    </div>
  );
};

export default ExportButtons;