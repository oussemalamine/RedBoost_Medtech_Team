import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance.js';
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CFormLabel,
  CFormTextarea,
  CInputGroup
} from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as XLSX from 'xlsx'; 
const CreateContact = () => {
  const secteursActivites = [
    { value: 'Agriculture durable', label: 'Agriculture durable' },
    { value: 'Cosmétique', label: 'Cosmétique' },
    { value: 'Recyclage', label: 'Recyclage' },
    { value: 'Green Tech', label: 'Green Tech' },
    { value: 'Agro-alimentaire', label: 'Agro-alimentaire' },
    { value: 'Créatif et culturel', label: 'Créatif et culturel' },
    { value: 'Tourisme durable', label: 'Tourisme durable' },
    { value: 'Optimisation de la consommation', label: 'Optimisation de la consommation' },
    { value: 'Énergie renouvelable', label: 'Énergie renouvelable' },
    { value: 'Gestion des ressources hydrauliques', label: 'Gestion des ressources hydrauliques' }
  ];

  const regions = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa',
    'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia',
    'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  const initialContactData = {
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    dateDeNaissance: '',
    region: '',
    gender: '',
    startupName: '',
    description: '',
    gouvernorat: '',
    secteurActivites: '',
    nombreCofondateurs: '',
    nombreCofondateursFemmes: '',
    creeeOuNon: '',
    formeJuridique: '',
    nombreEmploisCrees: '',
    coutProjet: ''
  };

  const [contactData, setContactData] = useState(initialContactData);

  const notifyError = (field) => {
    toast.error(`The ${field} field is required.`, {
      autoClose: 3000,
    });
  };

  const notifySuccess = () => {
    toast.success("Contact created successfully", {
      autoClose: 3000,
    });
  };

  const validateCofondateurs = () => {
    const { nombreCofondateurs, nombreCofondateursFemmes } = contactData;
    if (Number(nombreCofondateursFemmes) > Number(nombreCofondateurs)) {
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const field in contactData) {
      if (contactData[field] === "") {
        notifyError(field);
        return;
      }
    }

    if (!validateCofondateurs()) {
      toast.error("Nombre Cofondateurs Femmes cannot be greater than Nombre Cofondateurs", {
        autoClose: 3000,
      });
      return;
    }

    try {
      await axiosInstance.post('/createntrepreneurs', contactData);
      notifySuccess();
      setContactData(initialContactData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create contact', {
        autoClose: 3000,
      });
    }
  };
  // Function to generate blank Excel template
  const generateTemplateData = () => {
    const templateData = [
      {
        "Nom": contactData.nom,
        "Prénom": contactData.prenom,
        "Adresse": contactData.adresse,
        "Email": contactData.email,
        "Date de Naissance": contactData.dateDeNaissance,
        "Region": contactData.region,
        "Gender": contactData.gender,
        "Startup Name": contactData.startupName,
        "Description": contactData.description,
        "Gouvernorat": contactData.gouvernorat,
        "Secteur Activités": contactData.secteurActivites,
        "Nombre Cofondateurs": contactData.nombreCofondateurs,
        "Nombre Cofondateurs Femmes": contactData.nombreCofondateursFemmes,
        "Créée Ou Non": contactData.creeeOuNon,
        "Forme Juridique": contactData.formeJuridique,
        "Nombre Emplois Créés": contactData.nombreEmploisCrees,
        "Coût Projet": contactData.coutProjet
      }
    ];
    return templateData;
  };

// Function to handle export as Excel template
const handleExport = () => {
  const templateData = generateTemplateData();
  const ws = XLSX.utils.json_to_sheet(templateData);

  // Applying basic styling to the template
  ws["A1"].s = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { bgColor: { indexed: 8 } } }; // Header row
  for (let i = 2; i <= Object.keys(templateData[0]).length; i++) {
    const cell = XLSX.utils.encode_cell({ r: 0, c: i - 1 });
    ws[cell].s = { font: { bold: true } }; // Bold text for column labels
  }
  if (!templateData || templateData.length === 0) {
    console.error("No data to export.");
    return;
  }
  // Adding data validation rules
  const validateName = {
    t: "s",
    allowBlank: false,
    minLength: 1,
    maxLength: 50 // Maximum character limit for name column
  };
  const validatePrenom = {
    t: "s",
    allowBlank: false,
    minLength: 1,
    maxLength: 50 // Maximum character limit for prenom column
  };
  const validateAdresse = {
    t: "s",
    allowBlank: false,
    minLength: 1,
    maxLength: 100 // Maximum character limit for adresse column
  };
  const validateEmail = {
    t: "s",
    allowBlank: false,
    type: "email" // Email format validation for email column
  };
  const validateDateDeNaissance = {
    t: "s",
    allowBlank: false,
    dateFormat: "MM/DD/YYYY" // Date format validation for dateDeNaissance column
  };
  const validateRegion = {
    t: "s",
    allowBlank: false
  };
  const validateGender = {
    t: "s",
    allowBlank: false,
    list: [{ text: "homme", value: "homme" }, { text: "femme", value: "femme" }] // Gender options for gender column
  };
  const validateStartupName = {
    t: "s",
    allowBlank: false,
    minLength: 1,
    maxLength: 100 // Maximum character limit for startupName column
  };
  const validateDescription = {
    t: "s",
    allowBlank: false,
    minLength: 1,
    maxLength: 500 // Maximum character limit for description column
  };
  const validateGouvernorat = {
    t: "s",
    allowBlank: false,
    minLength: 1,
    maxLength: 50 // Maximum character limit for gouvernorat column
  };
  const validateSecteurActivites = {
    t: "s",
    allowBlank: false,
    list: secteursActivites.map(secteur => ({ text: secteur.label, value: secteur.value })) // List of secteurActivites options
  };
  const validateNombreCofondateurs = {
    t: "n",
    allowBlank: false,
    min: 0 // Minimum value for nombreCofondateurs column
  };
  const validateNombreCofondateursFemmes = {
    t: "n",
    allowBlank: false,
    min: 0 // Minimum value for nombreCofondateursFemmes column
  };
  const validateCreeeOuNon = {
    t: "s",
    allowBlank: false,
    list: [{ text: "oui", value: "oui" }, { text: "non", value: "non" }] // CreeeOuNon options
  };
  const validateFormeJuridique = {
    t: "s",
    allowBlank: false,
    list: ["SARL", "SUARL", "SA", "SAS"] // FormeJuridique options
  };
  const validateNombreEmploisCrees = {
    t: "n",
    allowBlank: false,
    min: 0 // Minimum value for nombreEmploisCrees column
  };
  const validateCoutProjet = {
    t: "n",
    allowBlank: false,
    min: 0 // Minimum value for coutProjet column
  };
  // Define validations for other columns as needed

  // Apply validation rules to each column
  const columnValidations = {
    A: validateName,
    B: validatePrenom,
    C: validateAdresse,
    D: validateEmail,
    E: validateDateDeNaissance,
    F: validateRegion,
    G: validateGender,
    H: validateStartupName,
    I: validateDescription,
    J: validateGouvernorat,
    K: validateSecteurActivites,
    L: validateNombreCofondateurs,
    M: validateNombreCofondateursFemmes,
    N: validateCreeeOuNon,
    O: validateFormeJuridique,
    P: validateNombreEmploisCrees,
    Q: validateCoutProjet
    // Add more validations for other columns as needed
  };

  for (let col in columnValidations) {
    const range = { s: { r: 1, c: col.charCodeAt(0) - 65 }, e: { r: templateData.length, c: col.charCodeAt(0) - 65 } };
    ws["!cols"] = [{}, ...Array.from({ length: Object.keys(templateData[0]).length }, () => ({ wch: 20 }))]; // Set column width
    // Apply column validation rules
    const colValidation = columnValidations[col];
    const colIndex = col.charCodeAt(0) - 65;
    // Apply validation rules to each cell in the column
    for (let rowIndex = 1; rowIndex <= templateData.length; rowIndex++) {
      const cell = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      Object.assign(ws[cell], colValidation);
    }
    // Apply validation rules to the column header cell
    const headerCell = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    Object.assign(ws[headerCell], colValidation);
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Contacts_Template');
  XLSX.writeFile(wb, 'contacts_template.xlsx');
};


  // Function to handle export button click
  const handleExportClick = () => {
    handleExport();
  };
  // Function to handle import button click
  const handleImportClick = () => {
    // Programmatically trigger the file input dialog
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx, .xls'; // Set accepted file types
    fileInput.addEventListener('change', (e) => handleImport(e.target.files[0])); // This line attaches the event listener
    fileInput.click(); // Trigger click event on the file input element
  };
  
// Function to handle import from Excel template
const handleImport = (file) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    // Assuming the first sheet contains the data
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON object
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Validate each cell's data
    const isValid = validateData(jsonData);

    if (isValid) {
      // Data is valid, process it further
      processData(jsonData);
    } else {
      // Data is not valid, show error message or handle accordingly
      console.error("Imported data is not valid.");
    }
  };

  reader.readAsArrayBuffer(file);
};



// Function to validate each cell's data
const validateData = (data) => {
  // Check if data is empty
  if (!data || data.length === 0) {
    console.error("Imported data is empty.");
    return false;
  }

  // Define validation rules for each column
  const validationRules = {
    A: (value) => typeof value === "string" && value.trim().length > 0, // Nom
    B: (value) => typeof value === "string" && value.trim().length > 0, // Prénom
    C: (value) => typeof value === "string" && value.trim().length > 0, // Adresse
    D: (value) => typeof value === "string" && value.trim().length > 0, // Email
    E: (value) => typeof value === "string" && value.trim().length > 0, // Date de Naissance
    F: (value) => typeof value === "string" && value.trim().length > 0 && regions.includes(value.trim()), // Region
    G: (value) => typeof value === "string" && (value.trim() === "homme" || value.trim() === "femme"), // Gender
    H: (value) => typeof value === "string" && value.trim().length > 0, // Startup Name
    I: (value) => typeof value === "string" && value.trim().length > 0, // Description
    J: (value) => typeof value === "string" && value.trim().length > 0 && regions.includes(value.trim()), // Gouvernorat
    K: (value) => typeof value === "string" && secteursActivites.some(secteur => secteur.value === value.trim()), // Secteur Activités
    L: (value) => !isNaN(value) && value >= 0, // Nombre Cofondateurs
    M: (value) => !isNaN(value) && value >= 0, // Nombre Cofondateurs Femmes
    N: (value) => typeof value === "string" && (value.trim() === "oui" || value.trim() === "non"), // Créée Ou Non
    O: (value) => typeof value === "string" && ["SARL", "SUARL", "SA", "SAS"].includes(value.trim()), // Forme Juridique
    P: (value) => !isNaN(value) && value >= 0, // Nombre Emplois Créés
    Q: (value) => !isNaN(value) && value >= 0, // Coût du Projet
  };

  // Validate each cell's data
  for (let row = 1; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const cellValue = data[row][col];
      const cellAddress = String.fromCharCode(65 + col) + (row + 1); // Convert column index to corresponding letter (A, B, C, ...)
      const validationRule = validationRules[String.fromCharCode(65 + col)]; // Get validation rule for the column

      if (!validationRule || !validationRule(cellValue)) {
        console.error(`Invalid data at cell ${cellAddress}: ${cellValue}`);
        return false;
      }
    }
  }

  // All data is valid
  return true;
};


// Function to process imported data
const processData = (data) => {
  // Process the imported data further
  console.log("Imported data:", data);
};



  return (
    <CContainer className="my-4">
      <div className=" d-flex justify-content-end mt-0 ">
      <CButton type="button" color="success" onClick={handleExportClick}>Export Template</CButton>
            <CButton type="button" color="success" onClick={handleImportClick}>Import Excel sheet</CButton>
      </div>
      <ToastContainer />
      <CCard>
        <CCardHeader className="bg-dark text-light">Create New Contact</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <fieldset className="border border-success p-2 bg-light" style={{ marginBottom: "20px", borderRadius: "10px" }}>
              <legend className="float-none w-auto">Information sur l'entrepreneur</legend>
              <div className='contactSection'>
                <CFormInput
                  type="text"
                  name="nom"
                  value={contactData.nom}
                  onChange={handleInputChange}
                  placeholder="Nom"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="text"
                  name="prenom"
                  value={contactData.prenom}
                  onChange={handleInputChange}
                  placeholder="Prénom"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="text"
                  name="adresse"
                  value={contactData.adresse}
                  onChange={handleInputChange}
                  placeholder="Adresse"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="date"
                  name="dateDeNaissance"
                  value={contactData.dateDeNaissance}
                  onChange={handleInputChange}
                  placeholder="Date de Naissance"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormSelect
                  name="region"
                  value={contactData.region}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: '10px' }}
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </CFormSelect>
                <CFormSelect
                  name="gender"
                  value={contactData.gender}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: '10px' }}
                >
                  <option value="">Select Gender</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </CFormSelect>
              </div>
            </fieldset>

            <fieldset className="border border-success p-2 bg-light" style={{ marginBottom: "20px", borderRadius: "10px" }}>
              <legend className="float-none w-auto">Information sur le projet</legend>
              <div className='contactSection'>
                <CFormInput
                  type="text"
                  name="startupName"
                  value={contactData.startupName}
                  onChange={handleInputChange}
                  placeholder="Startup Name"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormTextarea
                  name="description"
                  value={contactData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormSelect
                  name="gouvernorat"
                  value={contactData.gouvernorat}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: '10px' }}
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </CFormSelect>
                <CFormSelect
                  name="secteurActivites"
                  value={contactData.secteurActivites}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: '10px' }}
                >
                  <option value="">Sélectionnez un secteur d'activité</option>
                  {secteursActivites.map((secteur) => (
                    <option key={secteur.value} value={secteur.value}>
                      {secteur.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormInput
                  type="number"
                  name="nombreCofondateurs"
                  value={contactData.nombreCofondateurs}
                  onChange={handleInputChange}
                  placeholder="Nombre Cofondateurs"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="number"
                  name="nombreCofondateursFemmes"
                  value={contactData.nombreCofondateursFemmes}
                  onChange={handleInputChange}
                  placeholder="Nombre Cofondateurs Femmes"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormSelect
                  name="creeeOuNon"
                  value={contactData.creeeOuNon}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: '10px' }}
                >
                  <option value="">Créée Ou Non</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </CFormSelect>
                <CFormSelect
                  name="formeJuridique"
                  value={contactData.formeJuridique}
                  onChange={handleInputChange}
                  required
                  style={{ marginBottom: '10px' }}
                >
                  <option value="">Forme Juridique</option>
                  <option value="SARL">SARL</option>
                  <option value="SUARL">SUARL</option>
                  <option value="SA">SA</option>
                  <option value="SAS">SAS</option>
                </CFormSelect>
                <CFormInput
                  type="number"
                  name="nombreEmploisCrees"
                  value={contactData.nombreEmploisCrees}
                  onChange={handleInputChange}
                  placeholder="Nombre d'emplois créés"
                  required
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="number"
                  name="coutProjet"
                  value={contactData.coutProjet}
                  onChange={handleInputChange}
                  placeholder="Coût du projet"
                  required
                  style={{ marginBottom: '10px' }}
                />
              </div>
            </fieldset>

            <CButton type="submit" color="primary">Submit</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default CreateContact;
