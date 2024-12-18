import mongoose, { Schema } from "mongoose";

const CategorieSchema = new Schema({
  id: { type: Number, required: true },
  code: { type: String, required: true },
  libelle: { type: String, required: true },
});

// Sous-schéma pour la saison
const SaisonSchema = new Schema({
  id: { type: Number, required: true },
  code: { type: String, required: true },
  libelle: { type: String, required: true },
  debut: { type: String, required: true }, // Stocké en format ISO string
  fin: { type: String, required: true },   // Stocké en format ISO string
  actif: { type: Boolean, required: true },
});

// Sous-schéma pour l'organisme
const OrganismeSchema = new Schema({
  id: { type: Number, required: true },
  libelle: { type: String, required: true },
  code: { type: String },
});

// Sous-schéma pour les poules
const PouleSchema = new Schema({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
});

// Sous-schéma pour les classements
const ClassementSchema = new Schema({
  organisme: { type: OrganismeSchema, required: true },
  matchJoues: { type: Number, required: true },
  points: { type: Number, required: true },
  position: { type: Number, required: true },
  gagnes: { type: Number, required: true },
  perdus: { type: Number, required: true },
  nuls: { type: Number, required: true },
  pointsInitiaux: { type: Number, default: null },
  penalitesArbitrage: { type: Number },
  penalitesEntraineur: { type: Number },
  penalitesDiverses: { type: Number },
  nombreForfaits: { type: Number },
  nombreDefauts: { type: Number },
  paniersMarques: { type: Number },
  paniersEncaisses: { type: Number },
  quotient: { type: Number },
  difference: { type: Number },
  horsClassement: { type: Boolean },
});

// Schéma principal pour la compétition
const CompetitionSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  idCompetitionPere: { type: Number, default: null },
  nom: { type: String, required: true },
  sexe: { type: String, required: true },
  categorie: { type: CategorieSchema, required: true },
  code: { type: String, required: true },
  fils: { type: Array, default: [] }, // Tableau générique
  saison: { type: SaisonSchema, required: true },
  typeCompetition: { type: String, required: true },
  liveStat: { type: Boolean, required: true },
  creationEnCours: { type: Boolean, required: true },
  publicationInternet: { type: String, required: true },
  classification: { type: String, default: null },
  organisme: { type: OrganismeSchema, required: true },
  creation: { type: String, default: null }, // ISO string or null
  modification: { type: String, default: null },
  etat: { type: String, default: null },
  poules: { type: [PouleSchema], default: [] }, // Tableau de poules
  classements: { type: [ClassementSchema], default: [] }, // Tableau de classements
});

const Competition =
  mongoose.models.Competition ||
  mongoose.model("Competition", CompetitionSchema);

export default Competition