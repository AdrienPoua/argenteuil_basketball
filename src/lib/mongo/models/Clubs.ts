import mongoose, { Schema } from "mongoose";

// Définir le schéma du Club
const clubSchema = new Schema({
  name: { type: String },
  correspondant: {
    name: { type: String },
    email: { type: String },
    number: { type: String },
  },
});

// Définir le modèle Club
const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);

export default Club;
