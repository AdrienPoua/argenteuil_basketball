import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Member extends Document {
  name: string;
  firstName: string;
  email: string;
  birthday: string;
  createdAt: Date;
  statut?: string;
  year?: string;
  categorie?: string;
}

const memberSchema: Schema<Member> = new Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  statut: { type: String },
  year: { type: String },
  categorie: { type: String },
});

const Member: Model<Member> = mongoose.models.Member || mongoose.model<Member>('Member', memberSchema);

export default Member;
