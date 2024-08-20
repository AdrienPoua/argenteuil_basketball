import mongoose, { Schema, Model } from "mongoose";
import { TDatabase } from "@/utils/types";

const memberSchema = new Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  statut: { type: String },
  year: { type: String },
  categorie: { type: String },
});

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
