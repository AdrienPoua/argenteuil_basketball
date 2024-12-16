import mongoose from "mongoose";

const OrganismeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  libelle: { type: String, required: true },
  code: { type: String, required: false, default: null }, // nullable
});

const OrganismeStatsSchema = new mongoose.Schema({
  organisme: { type: OrganismeSchema, required: true },
  matchJoues: { type: Number, required: false, default: null }, // nullable
  points: { type: Number, required: false, default: null }, // nullable
  position: { type: Number, required: false, default: null }, // nullable
  gagnes: { type: Number, required: false, default: null }, // nullable
  perdus: { type: Number, required: false, default: null }, // nullable
  paniersMarques: { type: Number, required: false, default: null }, // nullable & optional
  paniersEncaisses: { type: Number, required: false, default: null }, // nullable & optional
  difference: { type: Number, required: false, default: null }, // nullable & optional
});

// Définir le schéma comme un tableau d'OrganismeStatsSchema
const RankingSchema = new mongoose.Schema({
  ranking : [OrganismeStatsSchema]
});

// Créer le modèle
const Rank = mongoose.models.Rank || mongoose.model("Rank", RankingSchema);

export default Rank;
