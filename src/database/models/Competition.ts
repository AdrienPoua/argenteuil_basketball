import mongoose from "mongoose";

// Sous-schéma pour la catégorie
const CategorieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  code: { type: String, required: true },
  libelle: { type: String, required: true },
});

// Sous-schéma pour la saison
const SaisonSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  code: { type: String, required: true },
  libelle: { type: String, required: true },
  debut: { type: Date, required: true },
  fin: { type: Date, required: true },
  actif: { type: Boolean, required: true },
});

// Sous-schéma pour l'organisme
const OrganismeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  libelle: { type: String, required: true },
  code: { type: String, required: true },
});

// Sous-schéma pour les poules
const PouleSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
});

// Sous-schéma pour les classements
const ClassementSchema = new mongoose.Schema({
  organisme: { type: OrganismeSchema, required: true },
  matchJoues: { type: Number, required: true },
  points: { type: Number, required: true },
  position: { type: Number, required: true },
  gagnes: { type: Number, required: true },
  perdus: { type: Number, required: true },
  nuls: { type: Number, required: true },
  pointsInitiaux: { type: Number, default: null },
  penalitesArbitrage: { type: Number, required: true },
  penalitesEntraineur: { type: Number, required: true },
  penalitesDiverses: { type: Number, required: true },
  nombreForfaits: { type: Number, required: true },
  nombreDefauts: { type: Number, required: true },
  paniersMarques: { type: Number, required: true },
  paniersEncaisses: { type: Number, required: true },
  quotient: { type: Number, required: true },
  difference: { type: Number, required: true },
  horsClassement: { type: Boolean, required: true },
});

// Schéma principal pour la compétition
const CompetitionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  idCompetitionPere: { type: Number, default: null },
  nom: { type: String, required: true },
  sexe: { type: String, required: true },
  categorie: { type: CategorieSchema, required: true },
  code: { type: String, required: true },
  fils: { type: [mongoose.Schema.Types.Mixed], default: [] }, // Tableaux génériques
  saison: { type: SaisonSchema, required: true },
  typeCompetition: { type: String, required: true },
  liveStat: { type: Boolean, required: true },
  creationEnCours: { type: Boolean, required: true },
  publicationInternet: { type: String, required: true },
  classification: { type: String, default: null },
  organisme: { type: OrganismeSchema, required: true },
  creation: { type: Date, required: true },
  modification: { type: Date, required: true },
  etat: { type: String, required: true },
  poules: { type: [PouleSchema], default: [] },
  classements: { type: [ClassementSchema], default: [] },
});

const Competition =
  mongoose.models.Competition ||
  mongoose.model("Competition", CompetitionSchema);

export default Competition