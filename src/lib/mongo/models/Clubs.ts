import mongoose, { Schema, Model } from "mongoose";

const clubSchema: Schema<{ club: string; correspondant: string }> = new Schema({
  club: { type: String, required: true },
  correspondant: { type: String, required: true },
});

const Club: Model<{ club: string; correspondant: string }> =
  mongoose.models.Club || mongoose.model<{ club: string; correspondant: string }>("Club", clubSchema);

export default Club;
