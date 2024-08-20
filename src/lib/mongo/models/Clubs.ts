import mongoose, { Schema } from "mongoose";

// Définir un sous-schéma pour Member
const memberSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  number: { type: String, required: true },
});

// Définir le schéma du Club
const clubSchema = new Schema({
  name: { type: String },
  members: { type: [memberSchema] },
});

// Définir le modèle Club
const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);

export default Club;
