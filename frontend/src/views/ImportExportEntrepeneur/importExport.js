import React ,{ useState } from 'react'
import * as XLSX from 'xlsx';
import { CButton } from '@coreui/react';
export  function ImportExport() {
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

  const [contactData, setContactData] = useState({
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
  });
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
    fileInput.addEventListener('change', (e) => {
      handleImport(e.target.files[0]);
      fileInput.remove();
    }); 
    fileInput.click(); // Trigger click event on the file input element
  };
  
// Function to handle import from Excel template
const handleImport = (file) => {
  const reader = new FileReader();

    // for errors :
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      toast.error('Failed to read file.');
    };
    // the actual loading
  reader.onload = (e) => {
    try{
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
      toast.error('Imported data is not valid.');
      console.error("Imported data is not valid.");
    }
  }catch (error) {
    console.error('Error parsing file:', error);
    toast.error('Failed to parse file.');
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // MM/DD/YYYY format
  // Define validation rules for each column
  const validationRules = {
    A: (value) => typeof value === "string" && value.trim().length > 0, // Nom
    B: (value) => typeof value === "string" && value.trim().length > 0, // Prénom
    C: (value) => typeof value === "string" && value.trim().length > 0, // Adresse
    D: (value) => typeof value === "string" && emailRegex.test(value.trim()), // Email
    E: (value) =>typeof  value ==="", // Date de Naissance, // Date de Naissance
    F: (value) => typeof value === "string" && regions.includes(value.trim()), // Region
    G: (value) => typeof value === "string" && (value.trim() === "homme" || value.trim() === "femme"), // Gender
    H: (value) => typeof value === "string" && value.trim().length > 0, // Startup Name
    I: (value) => typeof value === "string" && value.trim().length > 0, // Description
    J: (value) => typeof value === "string" && regions.includes(value.trim()), // Gouvernorat
    K: (value) => typeof value === "string" && secteursActivites.some(secteur => secteur.value === value.trim()), // Secteur Activités
    L: (value) => !isNaN(value) && value >= 0, // Nombre Cofondateurs
    M: (value) => !isNaN(value) && value >= 0, // Nombre Cofondateurs Femmes
    N: (value) => typeof value === "string" && (value.trim().toLowerCase() === "oui" || value.trim().toLowerCase() === "non"), // Créée Ou Non
    O: (value) => typeof value === "string" && ["SARL", "SUARL", "SA", "SAS"].includes(value.trim()), // Forme Juridique
    P: (value) => !isNaN(value) && value >= 0, // Nombre Emplois Créés
    Q: (value) => !isNaN(value) && value >= 0, // Coût du Projet
  };

  // Validate each cell's data
  for (let row = 1; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const cellValue = data[row][col];
      const colLetter = String.fromCharCode(65 + col);
      const cellAddress = `${colLetter}${row + 1}`;
      const validationRule = validationRules[colLetter];
      
      if (!validationRule || !validationRule(cellValue)) {
        console.error(`Invalid data at cell ${cellAddress}: ${cellValue}`);
        return false;
      }
    }
  }
  return true;
};


// Function to process imported data
const processData = (data) => {
  const headers = data[0];
  const contacts = data.slice(1).map((row) => {
    return headers.reduce((contact, header, index) => {
      contact[header] = row[index];
      return contact;
    }, {});
  });
  console.log("Processed contacts:", contacts);
  // Further processing or API calls to save the data
};
  return (
    <div className=" d-flex justify-content-end mt- ">
      <CButton type="button" className='m-4 ' color="primary" onClick={handleExportClick}>Export Template</CButton>
      <CButton type="button" className='m-4 ' color="primary" onClick={handleImportClick}>Import Excel sheet</CButton>
    </div>
  )
}
