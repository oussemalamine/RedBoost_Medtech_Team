import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol
} from '@coreui/react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';
import 'react-toastify/dist/ReactToastify.css';

const EditButtonPop = ({ visible, setVisible, entrepreneur }) => {
  const dispatch = useDispatch();

  // Initialize state with entrepreneur data or empty strings
  const [contactData, setContactData] = useState({
    nom: entrepreneur.nom || '',
    prenom: entrepreneur.prenom || '',
    adresse: entrepreneur.adresse || '',
    email: entrepreneur.email || '',
    dateDeNaissance: entrepreneur.dateDeNaissance || '',
    region: entrepreneur.region || '',
    gender: entrepreneur.gender || '',
    startupName: entrepreneur.startupName || '',
    gouvernorat: entrepreneur.gouvernorat || '',
    secteurActivites: entrepreneur.secteurActivites || '',
    nombreCofondateurs: entrepreneur.nombreCofondateurs || '',
    nombreCofondateursFemmes: entrepreneur.nombreCofondateursFemmes || '',
    creeeOuNon: entrepreneur.creeeOuNon || '',
    formeJuridique: entrepreneur.formeJuridique || '',
    nombreEmploisCrees: entrepreneur.nombreEmploisCrees || '',
    coutProjet: entrepreneur.coutProjet || '',
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({});

  // List of sectors of activities and regions
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Ensure numeric fields do not accept negative values
    if (['nombreCofondateurs', 'nombreCofondateursFemmes', 'nombreEmploisCrees', 'coutProjet'].includes(name)) {
      // Convert value to integer (if empty or non-numeric, it becomes NaN)
      const numericValue = parseInt(value, 10);
  
      // Check if the value is not NaN and is negative
      if (!isNaN(numericValue) && numericValue < 0) {
        // Handle negative value case (for example, reset to 0)
        setContactData({ ...contactData, [name]: '' });
        // Display error message or toast
        displayErrorToast({ general: 'Les valeurs négatives ne sont pas autorisées.' });
        return;
      }
    }
  
    // Update state with the new value
    setContactData({ ...contactData, [name]: value });
  
    // Clear validation error for the field when user starts typing
    setValidationErrors({ ...validationErrors, [name]: '' });
  };
  // Save changes
  const handleSaveChanges = async () => {
    try {
      // Validate form (assuming validateForm and displayErrorToast functions are defined elsewhere)
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        displayErrorToast(errors);
        return;
      }
  
      // Make PUT request to update entrepreneur
      const response = await axiosInstance.put(`/updateEntrepreneur/${entrepreneur._id}`, contactData);
  
      // Assuming entrepreneur state is updated elsewhere in your React component
      setVisible(false); // Close modal after saving
  
      // Show success toast
      toast.success('Entrepreneur mis à jour avec succès!', {
        autoClose: 3000,
      });
    } catch (error) {
      // Handle error
      console.error('Error updating entrepreneur:', error);
  
      // Show error toast
      toast.error('Erreur lors de la mise à jour de l\'entrepreneur. Veuillez réessayer.', {
        autoClose: 3000,
      });
    }
  };
  
  // Function to validate form fields
  const validateForm = () => {
    const errors = {};

    if (!contactData.nom.trim()) {
      errors.nom = 'Le nom est requis.';
    }
    if (!contactData.prenom.trim()) {
      errors.prenom = 'Le prénom est requis.';
    }
    if (!contactData.adresse.trim()) {
      errors.adresse = "L'adresse est requise.";
    }
    if (!contactData.email.trim()) {
      errors.email = "L'email est requis.";
    } else if (!isValidEmail(contactData.email)) {
      errors.email = "L'email n'est pas valide.";
    }
    if (!contactData.dateDeNaissance) {
      errors.dateDeNaissance = 'La date de naissance est requise.';
    }
    if (!contactData.region) {
      errors.region = 'La région est requise.';
    }
    if (!contactData.gender) {
      errors.gender = 'Le genre est requis.';
    }
    if (!contactData.startupName.trim()) {
      errors.startupName = 'Le nom de la startup est requis.';
    }
    if (!contactData.gouvernorat) {
      errors.gouvernorat = 'Le gouvernorat est requis.';
    }
    if (!contactData.secteurActivites) {
      errors.secteurActivites = 'Le secteur d\'activités est requis.';
    }
    if (!contactData.nombreCofondateurs) {
      errors.nombreCofondateurs = 'Le nombre de cofondateurs est requis.';
    }
    if (!contactData.nombreCofondateursFemmes) {
      errors.nombreCofondateursFemmes = 'Le nombre de cofondateurs femmes est requis.';
    } else if (parseInt(contactData.nombreCofondateursFemmes, 10) > parseInt(contactData.nombreCofondateurs, 10)) {
      errors.nombreCofondateursFemmes = 'Le nombre de cofondateurs femmes ne peut pas être supérieur au nombre total de cofondateurs.';
    }
    if (!contactData.creeeOuNon) {
      errors.creeeOuNon = 'Ce champ est requis.';
    }
    if (!contactData.formeJuridique) {
      errors.formeJuridique = 'La forme juridique est requise.';
    }
    if (!contactData.nombreEmploisCrees) {
      errors.nombreEmploisCrees = 'Le nombre d\'emplois créés est requis.';
    }
    if (!contactData.coutProjet) {
      errors.coutProjet = 'Le coût du projet est requis.';
    }

    return errors;
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  
  // Function to display error toast
  const displayErrorToast = (errors) => {
    const errorMessage = Object.values(errors).join(' ');
    toast.error(errorMessage, {
      autoClose: 3000,
    });
  };

  if (!entrepreneur) return null;

  return (
    <CModal
      size='lg'
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="editButtonPopModal"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle>Edit Entrepreneur</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-0">
          {/* Information about the entrepreneur */}
          <CCol md="6" className="mb-4">
            <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0">
              <legend className="w-auto">Information sur l'entrepreneur</legend>
              <CFormLabel className="mt-2">Nom</CFormLabel>
              <CFormInput
                type="text"
                name="nom"
                value={contactData.nom}
                onChange={handleInputChange}
                invalid={validationErrors.nom ? true : false}
              />
              {validationErrors.nom && <div className="invalid-feedback">{validationErrors.nom}</div>}
              <CFormLabel className="mt-2">Prénom</CFormLabel>
              <CFormInput
                type="text"
                name="prenom"
                value={contactData.prenom}
                onChange={handleInputChange}
                invalid={validationErrors.prenom ? true : false}
              />
              {validationErrors.prenom && <div className="invalid-feedback">{validationErrors.prenom}</div>}
              <CFormLabel className="mt-2">Adresse</CFormLabel>
              <CFormInput
                type="text"
                name="adresse"
                value={contactData.adresse}
                onChange={handleInputChange}
                invalid={validationErrors.adresse ? true : false}
              />
              {validationErrors.adresse && <div className="invalid-feedback">{validationErrors.adresse}</div>}
              <CFormLabel className="mt-2">Email</CFormLabel>
              <CFormInput
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
                invalid={validationErrors.email ? true : false}
              />
              {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
              <CFormLabel className="mt-2">Date de Naissance</CFormLabel>
              <CFormInput
                type="date"
                name="dateDeNaissance"
                value={contactData.dateDeNaissance}
                onChange={handleInputChange}
                invalid={validationErrors.dateDeNaissance ? true : false}
              />
              {validationErrors.dateDeNaissance && <div className="invalid-feedback">{validationErrors.dateDeNaissance}</div>}
              <CFormLabel className="mt-2">Région</CFormLabel>
              <CFormSelect
                name="region"
                value={contactData.region}
                onChange={handleInputChange}
                invalid={validationErrors.region ? true : false}
              >
                <option value="">Sélectionnez la région</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </CFormSelect>
              {validationErrors.region && <div className="invalid-feedback">{validationErrors.region}</div>}
              <CFormLabel className="mt-2">Genre</CFormLabel>
              <CFormSelect
                name="gender"
                value={contactData.gender}
                onChange={handleInputChange}
                invalid={validationErrors.gender ? true : false}
              >
                <option value="">Sélectionnez le genre</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </CFormSelect>
              {validationErrors.gender && <div className="invalid-feedback">{validationErrors.gender}</div>}
            </fieldset>
          </CCol>

          {/* Information about the startup */}
          <CCol md="6" className="mb-4">
            <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0">
              <legend className="w-auto">Information sur la startup</legend>
              <CFormLabel className="mt-2">Nom de la startup</CFormLabel>
              <CFormInput
                type="text"
                name="startupName"
                value={contactData.startupName}
                onChange={handleInputChange}
                invalid={validationErrors.startupName ? true : false}
              />
              {validationErrors.startupName && <div className="invalid-feedback">{validationErrors.startupName}</div>}
              <CFormLabel className="mt-2">Gouvernorat</CFormLabel>
              <CFormSelect
                name="gouvernorat"
                value={contactData.gouvernorat}
                onChange={handleInputChange}
                invalid={validationErrors.gouvernorat ? true : false}
              >
                <option value="">Sélectionnez le gouvernorat</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </CFormSelect>
              {validationErrors.gouvernorat && <div className="invalid-feedback">{validationErrors.gouvernorat}</div>}
              <CFormLabel className="mt-2">Secteur d'Activités</CFormLabel>
              <CFormSelect
                name="secteurActivites"
                value={contactData.secteurActivites}
                onChange={handleInputChange}
                invalid={validationErrors.secteurActivites ? true : false}
              >
                <option value="">Sélectionnez le secteur d'activités</option>
                {secteursActivites.map((secteur) => (
                  <option key={secteur.value} value={secteur.value}>
                    {secteur.label}
                  </option>
                ))}
              </CFormSelect>
              {validationErrors.secteurActivites && <div className="invalid-feedback">{validationErrors.secteurActivites}</div>}
              <CFormLabel className="mt-2">Nombre de Cofondateurs</CFormLabel>
              <CFormInput
                type="number"
                name="nombreCofondateurs"
                value={contactData.nombreCofondateurs}
                onChange={handleInputChange}
                invalid={validationErrors.nombreCofondateurs ? true : false}
              />
              {validationErrors.nombreCofondateurs && <div className="invalid-feedback">{validationErrors.nombreCofondateurs}</div>}
              <CFormLabel className="mt-2">Nombre de Cofondateurs Femmes</CFormLabel>
              <CFormInput
                type="number"
                name="nombreCofondateursFemmes"
                value={contactData.nombreCofondateursFemmes}
                onChange={handleInputChange}
                invalid={validationErrors.nombreCofondateursFemmes ? true : false}
              />
              {validationErrors.nombreCofondateursFemmes && <div className="invalid-feedback">{validationErrors.nombreCofondateursFemmes}</div>}
              <CFormLabel className="mt-2">Créée ou Non</CFormLabel>
              <CFormSelect
                name="creeeOuNon"
                value={contactData.creeeOuNon}
                onChange={handleInputChange}
                invalid={validationErrors.creeeOuNon ? true : false}
              >
                <option value="">Créée ou Non</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </CFormSelect>
              {validationErrors.creeeOuNon && <div className="invalid-feedback">{validationErrors.creeeOuNon}</div>}
              <CFormLabel className="mt-2">Forme Juridique</CFormLabel>
              <CFormSelect
                name="formeJuridique"
                value={contactData.formeJuridique}
                onChange={handleInputChange}
                invalid={validationErrors.formeJuridique ? true : false}
              >
                <option value="">Sélectionnez la forme juridique</option>
                <option value="SAS">SAS</option>
                <option value="SARL">SARL</option>
                <option value="SURL">SURL</option>
                <option value="SA">SA</option>
                <option value="SCA">SCA</option>
              </CFormSelect>
              {validationErrors.formeJuridique && <div className="invalid-feedback">{validationErrors.formeJuridique}</div>}
              <CFormLabel className="mt-2">Nombre d'Emplois Créés</CFormLabel>
              <CFormInput
                type="number"
                name="nombreEmploisCrees"
                value={contactData.nombreEmploisCrees}
                onChange={handleInputChange}
                invalid={validationErrors.nombreEmploisCrees ? true : false}
              />
              {validationErrors.nombreEmploisCrees && <div className="invalid-feedback">{validationErrors.nombreEmploisCrees}</div>}
              <CFormLabel className="mt-2">Coût du Projet</CFormLabel>
              <CFormInput
                type="number"
                name="coutProjet"
                value={contactData.coutProjet}
                onChange={handleInputChange}
                invalid={validationErrors.coutProjet ? true : false}
              />
              {validationErrors.coutProjet && <div className="invalid-feedback">{validationErrors.coutProjet}</div>}
            </fieldset>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Annuler
        </CButton>
        <CButton color="primary" onClick={handleSaveChanges}>
          Sauvegarder
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditButtonPop;
