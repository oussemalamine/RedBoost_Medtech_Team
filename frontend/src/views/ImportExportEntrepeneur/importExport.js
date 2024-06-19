import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CButton } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import axiosInstance from '../../axiosInstance.js';

export function ImportExport() {
  const secteursActivites = [
    'Agriculture durable', 'Cosmétique', 'Recyclage', 'Green Tech',
    'Agro-alimentaire', 'Créatif et culturel', 'Tourisme durable',
    'Optimisation de la consommation', 'Énergie renouvelable',
    'Gestion des ressources hydrauliques'
  ];

  const regions = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa',
    'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia',
    'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  const [contactData, setContactData] = useState({
    nom: '', prenom: '', adresse: '', email: '', dateDeNaissance: '',
    region: '', gender: '', startupName: '', description: '',
    gouvernorat: '', secteurActivites: '', nombreCofondateurs: '',
    nombreCofondateursFemmes: '', creeeOuNon: '', formeJuridique: '',
    nombreEmploisCrees: '', coutProjet: ''
  });

  const notifySuccess = () => {
    toast.success("Contact created successfully", {
      autoClose: 3000,
    });
  };

  const generateTemplateData = () => {
    return [{
      "Nom": contactData.nom, "Prénom": contactData.prenom,
      "Adresse": contactData.adresse, "Email": contactData.email,
      "Date de Naissance": contactData.dateDeNaissance, "Region": contactData.region,
      "Gender": contactData.gender, "Startup Name": contactData.startupName,
      "Description": contactData.description, "Gouvernorat": contactData.gouvernorat,
      "Secteur Activités": contactData.secteurActivites,
      "Nombre Cofondateurs": contactData.nombreCofondateurs,
      "Nombre Cofondateurs Femmes": contactData.nombreCofondateursFemmes,
      "Créée Ou Non": contactData.creeeOuNon, "Forme Juridique": contactData.formeJuridique,
      "Nombre Emplois Créés": contactData.nombreEmploisCrees, "Coût Projet": contactData.coutProjet
    }];
  };

  const handleExport = () => {
    const templateData = generateTemplateData();
    if (templateData.length === 0) {
      console.error("No data to export.");
      toast.error('No data available to export.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts_Template');
    XLSX.writeFile(wb, 'contacts_template.xlsx');
  };

  const handleExportClick = () => {
    handleExport();
  };

  const handleImportClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx, .xls';
    fileInput.addEventListener('change', (e) => {
      handleImport(e.target.files[0]);
      fileInput.remove();
    });
    fileInput.click();
  };

  let stopProcess = false; // Flag to stop the process after encountering the first error

  const excelDateToJSDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
  };

  const handleImport = (file) => {
    if (stopProcess) return; // Check if the flag is set to stop the process
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (validateData(jsonData)) {
          processData(jsonData);
        } else {
          console.error("Imported data is not valid.");
          toast.error('Imported data is not valid.');
          stopProcess = true; // Set the flag to stop further processing
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        toast.error('Failed to parse file.');
        stopProcess = true; // Set the flag to stop further processing
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      toast.error('Failed to read file.');
      stopProcess = true; // Set the flag to stop further processing
    };
    reader.readAsArrayBuffer(file);
  };

  const validateData = (data) => {
    if (!data || data.length === 0) {
      console.error("Imported data is empty.");
      toast.error('Imported data is empty. Please provide data to import.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validHeaders = [
      "Nom", "Prénom", "Adresse", "Email", "Date de Naissance", "Region",
      "Gender", "Startup Name", "Description", "Gouvernorat", "Secteur Activités",
      "Nombre Cofondateurs", "Nombre Cofondateurs Femmes", "Créée Ou Non",
      "Forme Juridique", "Nombre Emplois Créés", "Coût Projet"
    ];

    const headersMapping = {
      "Région": "Region",
      "Genre": "Gender",
      "Nom de Startup": "Startup Name",
      "Secteur d'activités": "Secteur Activités",
      "Nombre de Cofondateurs": "Nombre Cofondateurs",
      "Nombre de Cofondateurs Femmes": "Nombre Cofondateurs Femmes",
      "Créée ou Non": "Créée Ou Non",
      "Nombre d'emplois Créés": "Nombre Emplois Créés",
      "Coût du Projet": "Coût Projet"
    };

    const headers = data[0].map(header => header.trim());
    if (!validHeaders.every(header => headers.includes(header))) {
      const invalidHeaders = headers.filter(header => !validHeaders.includes(header));
      invalidHeaders.forEach(header => {
        console.error(`Invalid header detected: ${header}`);
        toast.error(`Invalid header detected: ${header}`);
      });
      return false;
    }

    const duplicatedEmails = {}; // Collect duplicate emails
    const invalidCells = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        const cellValue = row[j];
        if (header === "Email" && duplicatedEmails[cellValue]) {
          console.error(`Duplicated email found: ${cellValue} in row ${i + 1}`);
          toast.error(`Duplicated email found: ${cellValue} in row ${i + 1}`);
        }
        if (!validationRules[header](cellValue)) {
          console.error(`Validation failed for header "${header}" in row ${i + 1}`);
          const errorMsg = typeof validationRules[header](cellValue) === 'string' ? validationRules[header](cellValue) : 'Unknown error';
          invalidCells.push({ row: i + 1, column: header, value: cellValue, error: errorMsg });
        } else if (header === "Email") {
          if (duplicatedEmails[cellValue]) {
            console.error(`Duplicated email found: ${cellValue} in row ${i + 1}`);
            toast.error(`Duplicated email found: ${cellValue} in row ${i + 1}`);
          } else {
            duplicatedEmails[cellValue] = true;
          }
        }
      }
    }

    if (invalidCells.length > 0) {
      invalidCells.forEach(({ row, column, value, error }) => {
        console.error(`Invalid data in row ${row}, column ${column}: Value "${value}" - ${error}`);
        toast.error(`Invalid data in row ${row}, column ${column}: Value "${value}" - ${error}`);
      });
      return false;
    }

    return true;
  };

  const processData = (data) => {
    const headers = data[0].map(header => header.trim());
    const contacts = data.slice(1).map(row => {
      return headers.reduce((contact, header, index) => {
        let cellValue = row[index];
        if (header === 'Date de Naissance' && typeof cellValue === 'number') {
          cellValue = excelDateToJSDate(cellValue);
          const day = ('0' + cellValue.getDate()).slice(-2);
          const month = ('0' + (cellValue.getMonth() + 1)).slice(-2);
          const year = cellValue.getFullYear();
          cellValue = `${day}/${month}/${year}`;
        }
        contact[header] = cellValue;
        return contact;
      }, {});
    });

    console.log("Processed contacts:", contacts);
    saveContactsToServer(contacts);
  };
  const saveContactsToServer = async (contacts) => {
    try {
      console.log('Saving contacts to the server...');
      for (const contact of contacts) {
        const formattedContact = {
          nom: contact.Nom,
          prenom: contact['Prénom'],
          adresse: contact.Adresse,
          email: contact.Email,
          dateDeNaissance: new Date(contact['Date de Naissance']),
          region: contact.Region,
          gender: contact.Gender,
          startupName: contact['Startup Name'],
          description: contact.Description,
          gouvernorat: contact.Gouvernorat,
          secteurActivites: contact['Secteur Activités'],
          nombreCofondateurs: contact['Nombre Cofondateurs'],
          nombreCofondateursFemmes: contact['Nombre Cofondateurs Femmes'],
          creeeOuNon: contact['Créée Ou Non'],
          formeJuridique: contact['Forme Juridique'],
          nombreEmploisCrees: contact['Nombre Emplois Créés'],
          coutProjet: contact['Coût Projet']
        };
        await axiosInstance.post('/createntrepreneurs', formattedContact);
      }
      console.log('Contacts saved successfully!');
      toast.success('Contacts saved successfully!');
    } catch (error) {
      console.error('Error saving contacts:', error);
      toast.error('Failed to save contacts.');
    }
  };
/*<CButton onClick={handleExportClick}  color="primary" className="m-2">
        Export Template
      </CButton>*/
  return (
   <div>
      
      <CButton onClick={handleImportClick} color="secondary" className="m-2">
        Import Data
      </CButton>
      <ToastContainer />
    </div>
  );
}
