import mongoose from "mongoose";

const SalleSchema = new mongoose.Schema({
  libelle: { type: String, required: true },
});

const MatchSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  numero: { type: Number, required: true },
  numeroJournee: { type: Number, required: true },
  nomEquipe1: { type: String, required: true },
  nomEquipe2: { type: String, required: true },
  resultatEquipe1: { type: Number, required: true },
  resultatEquipe2: { type: Number, required: true },
  date: { type: String, required: true },
  horaire: { type: Number, required: true },
  salle: { type: SalleSchema, required: true },
  validee: { type: Boolean, required: true },
  joue: { type: Boolean, required: true },
  remise: { type: Boolean, required: true },
  forfaitEquipe1: { type: Boolean, required: true },
  forfaitEquipe2: { type: Boolean, required: true },
});

const Match = mongoose.models.Match || mongoose.model("Match", MatchSchema);

export default Match;
