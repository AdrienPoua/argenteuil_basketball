import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  numero: { type: Number, required: true },
  numeroJournee: { type: Number, required: true },
  idPoule: { type: Number, required: true },
  idOrganismeEquipe1: { type: Number, required: true },
  idOrganismeEquipe2: { type: Number, required: true },
  nomEquipe1: { type: String, required: true },
  nomEquipe2: { type: String, required: true },
  resultatEquipe1: { type: Number, default: null },
  resultatEquipe2: { type: Number, default: null },
  date: { type: Date, required: true },
  salle: { type: String },
  penaliteEquipe1: { type: Boolean },
  penaliteEquipe2: { type: Boolean },
  forfaitEquipe1: { type: Boolean },
  forfaitEquipe2: { type: Boolean },
  defautEquipe1: { type: Boolean },
  defautEquipe2: { type: Boolean },
  validee: { type: Boolean, required: true },
  remise: { type: Boolean, required: true },
  joue: { type: Boolean, required: true },
  handicap1: { type: Number, default: null },
  handicap2: { type: Number, default: null },
  dateSaisieResultat: { type: String }, // ISO string
  creation: { type: String }, // ISO string
  modification: { type: String }, // ISO string
  classementPouleAssociee: { type: Number, default: null },
  competition: { type: String },
});

const Match = mongoose.models.Match || mongoose.model("Match", MatchSchema);

export default Match;
