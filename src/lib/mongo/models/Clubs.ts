import mongoose, { Schema, Model } from "mongoose";
import { DBClubType } from "@/utils/types";

// Définir un sous-schéma pour Member
const memberSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  number: { type: String, required: true },
});

// Définir le schéma du Club
const clubSchema: Schema<DBClubType> = new Schema({
  name: { type: String },
  members: { type: [memberSchema] },
});

// Définir le modèle Club
const Club: Model<DBClubType> = mongoose.models.Club || mongoose.model<DBClubType>("Club", clubSchema);

export default Club;
