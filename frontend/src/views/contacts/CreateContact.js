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

  return (
    <CContainer className="my-4">
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
