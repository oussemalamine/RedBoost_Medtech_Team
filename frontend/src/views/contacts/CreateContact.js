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
  CRow,
  CFormTextarea,
  CCol,
  CFormFeedback,CFormLabel
} from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImportExport } from '../ImportExportEntrepeneur/importExport.js'

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
  const [validated, setValidated] = useState(false);

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
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

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
  }

  return (
    <CContainer >
      <ImportExport />
      <ToastContainer />
      <CCard>
        <CCardHeader className="bg-dark text-light">Create New Contact</CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow className='mb-0'>
  {/* Information about the entrepreneur */}
  <CCol md="6" className="mb-4">
    <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0" style={{ marginBottom: "20px" }}>
      <legend className="w-auto">Information sur l'entrepreneur</legend>
      <CRow>
        <CCol md="6">
          {/* Input fields for entrepreneur information */}
          <CFormLabel className="mt-2">Nom</CFormLabel>
          <CFormInput
            type="text"
            name="nom"
            value={contactData.nom}
            onChange={handleInputChange}
            valid={contactData.prenom!==''}
            placeholder="Nom"
            required
            feedbackInvalid="Le nom est requis."
          />
          </CCol>
          <CCol md="6">
          <CFormLabel className="mt-2">Prénom</CFormLabel>
          <CFormInput
            type="text"
            name="prenom"
            value={contactData.prenom}
            onChange={handleInputChange}
            valid={contactData.prenom!==''}
            placeholder="Prénom"
            required
            feedbackInvalid="Le prénom est requis."
          />
          </CCol>
          <CCol md='12'>
          <CFormLabel className="mt-2">Adresse</CFormLabel>
          <CFormInput
            type="text"
            name="adresse"
            value={contactData.adresse}
            onChange={handleInputChange}
            valid={contactData.adresse!==''}
            placeholder="Adresse"
            required
            feedbackInvalid="L'adresse est requise."
          />
          </CCol>
          <CCol  md='12'>
          <CFormLabel className="mt-2">Email</CFormLabel>
          <CFormInput
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleInputChange}
            valid={contactData.email!==''}
            placeholder="Email"
            required
            feedbackInvalid="L'email est requis."
          />
          </CCol>
          <CCol md='12'>
          <CFormLabel className="mt-2">Date de Naissance</CFormLabel>
          <CFormInput
            type="date"
            name="dateDeNaissance"
            value={contactData.dateDeNaissance}
            onChange={handleInputChange}
            valid={contactData.dateDeNaissance!==''}
            placeholder="Date de Naissance"
            required
            feedbackInvalid="La date de naissance est requise."
          />
          </CCol>
          <CCol md='6'>
          <CFormLabel className="mt-2">Région</CFormLabel>
          <CFormSelect
            name="region"
            value={contactData.region}
            onChange={handleInputChange}
            valid={contactData.region in regions}
            required
            feedbackInvalid="La région est requise."
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </CFormSelect>
          </CCol>
          <CCol md='6'>
          <CFormLabel className="mt-2">Gender</CFormLabel>
          <CFormSelect
            name="gender"
            value={contactData.gender}
            onChange={handleInputChange}
            valid={contactData.gender!==''}
            required
            feedbackInvalid="Gender is required."
          >
            <option value="">Sélectionnez le genre</option>
            <option value="homme">homme</option>
            <option value="femme">femme</option>
          </CFormSelect>
          </CCol>
          <CCol md='12'>
          <CFormLabel className="mt-2">Upload Picture</CFormLabel>
            <CFormInput type="file" accept="image/*"  name='logo'  />
          </CCol>
          <CCol>
            <CFormLabel className="mt-2">Description</CFormLabel>
            <CFormTextarea 
            name='Description'
            rows="1.5"
            placeholder='description'
            ></CFormTextarea>
          </CCol>
        </CRow>
    </fieldset>
  </CCol>

  {/* Startup Information */}
  <CCol md="6" className="mb-4">
    <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0" style={{ marginBottom: "20px" }}>
      <legend className="w-auto">Startup Information</legend>
      <div className="row">
        <CCol md="12">
          {/* Input fields for startup information */}
          <CFormLabel className="mt-2">Startup Name</CFormLabel>
          <CFormInput
            type="text"
            name="startupName"
            value={contactData.startupName}
            onChange={handleInputChange}
            valid={contactData.startupName!==''}
            placeholder="Startup Name"
            required
            feedbackInvalid="Startup name is required."
          />
          <CFormLabel className="mt-2">Description</CFormLabel>
          <CFormTextarea
            name="description"
            value={contactData.description}
            onChange={handleInputChange}

            valid={contactData.description!==''}
            placeholder="Description"
            rows="1.5"
            required
            feedbackInvalid="Description is required."
          />
          <CRow>
            <CCol md="6">
              <CFormLabel className="mt-2">Gouvernorat</CFormLabel>
              <CFormSelect
                name="gouvernorat"
                value={contactData.gouvernorat}
                onChange={handleInputChange}
                valid={contactData.gouvernorat!==''}
                required
                feedbackInvalid="Gouvernorat is required."
              >
                <option value="">Select Gouvernorat</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md="6">
              <CFormLabel className="mt-2">Secteur d'Activités</CFormLabel>
              <CFormSelect
                name="secteurActivites"
                value={contactData.secteurActivites}
                onChange={handleInputChange}
                valid={contactData.secteurActivites in secteursActivites}
                required
                feedbackInvalid="Secteur d'activités is required."
              >
                <option value="">Select Secteur d'activités</option>
                {secteursActivites.map((secteur) => (
                  <option key={secteur.value} value={secteur.value}>{secteur.label}</option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <CFormLabel className="mt-2">Nombre Cofondateurs</CFormLabel>
              <CFormInput
                type="number"
                name="nombreCofondateurs"
                value={contactData.nombreCofondateurs}
                onChange={handleInputChange}
                valid={contactData.nombreCofondateurs>0}
                placeholder="Nombre Cofondateurs"
                required
                feedbackInvalid="Nombre Cofondateurs is required."
              />
            </CCol>
            <CCol md="6">
              <CFormLabel className="mt-2">Nombre Cofondateurs Femmes</CFormLabel>
              <CFormInput
                type="number"
                name="nombreCofondateursFemmes"
                value={contactData.nombreCofondateursFemmes}
                valid={contactData.nombreCofondateursFemmes>0 && contactData.nombreCofondateurs>=contactData.nombreCofondateursFemmes}
                onChange={handleInputChange}
                placeholder="Nombre Cofondateurs Femmes"
                required
                feedbackInvalid="Nombre Cofondateurs Femmes is required."
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
          <CFormLabel className="mt-2">Creee ou non</CFormLabel>
          <CFormSelect
            name="creeeOuNon"
            value={contactData.creeeOuNon}
            onChange={handleInputChange}
            valid={contactData.creeeOuNon!==''}
            required
            feedbackInvalid="Creee ou non is required."
          >
            <option value="">Creee ou non</option>
            <option value="oui">Creee</option>
            <option value="non">Non</option>
          </CFormSelect>
          </CCol>
          <CCol md="6">
          <CFormLabel className="mt-2">Forme Juridique</CFormLabel>
          <CFormSelect
            name="formeJuridique"
            value={contactData.formeJuridique}
            onChange={handleInputChange}
            valid={contactData.formeJuridique!==''}
            required
            feedbackInvalid="Forme Juridique is required."
          >
            <option value="">Forme juridique</option>
            <option value="SAS">SAS</option>
            <option value="SARL">SARL</option>
            <option value="SUARL">SUARL</option>
            <option value="SA">SA</option>
            <option value="SCA">SCA</option>
          </CFormSelect>
          </CCol>
          </CRow>
          <CFormLabel className="mt-2">Nombre Emplois Crees</CFormLabel>
          <CFormInput
            type="number"
            name="nombreEmploisCrees"
            value={contactData.nombreEmploisCrees}            onChange={handleInputChange}
            placeholder="Nombre Emplois Crees"
            valid={contactData.nombreEmploisCrees>0}
            required
            feedbackInvalid="Nombre Emplois Crees is required."
          />
          <CFormLabel className="mt-2">Cout Projet</CFormLabel>
          <CFormInput
            type="number"
            name="coutProjet"
            value={contactData.coutProjet}
            onChange={handleInputChange}
            valid={contactData.coutProjet>0}
            placeholder="Cout Projet"
            required
            feedbackInvalid="Cout Projet is required."
          />
        </CCol>
      </div>
    </fieldset>
  </CCol>

  <CCol xs="12" className="d-flex justify-content-end mt-0 mb-4">
    <CButton color="primary" type="submit" className="btn-block">Submit</CButton>
  </CCol>
</CRow>

        </CForm>
      </CCardBody>
    </CCard>
  </CContainer>
);
}

export default CreateContact;
