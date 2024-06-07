const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrepreneurSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  dateDeNaissance: { type: Date, required: true },
  region: { type: String, required: true },
  gender: { type: String, enum: ['homme', 'femme'], required: true },
  age: { type: Number, required: true },
  startupName: { type: String, required: true },
  description: { type: String, required: true },
  gouvernorat: { type: String, required: true },
  secteurActivites: { type: String, required: true },
  nombreCofondateurs: { type: Number, required: true },
  nombreCofondateursFemmes: { type: Number, required: true },
  creeeOuNon: { type: String, enum: ['oui', 'non'], required: true },
  formeJuridique: { type: String, required: true },
  nombreEmploisCrees: { type: Number, required: true },
  coutProjet: { type: Number, required: true },
  nombreHeuresFormationCollective: { type: Number, required: true },
  nombreHeuresFormationIndividuelle: { type: Number, required: true },
  objectifsFinancement: { type: String, required: true },
  etatAvancementProjets: { type: String, required: true },
  autreFinancement: { type: String, required: true },
  organismeFinancement: { type: String, required: true },
  financementDecaisse: { type: String, required: true },
  dateDecaissement: { type: Date, required: true },
  montantFinancementAccorde: { type: Number, required: true },
  blacklisted: { type: Boolean, default: false },

});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;
