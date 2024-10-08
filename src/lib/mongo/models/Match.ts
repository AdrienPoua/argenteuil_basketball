import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
  division: { type: String, required: true },
  matchNumber: { type: String, required: true },
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  gym: { type: String },
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
