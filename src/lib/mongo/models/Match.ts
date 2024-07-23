import mongoose, { Schema, Model } from "mongoose";
import { DBMatchType } from "@/utils/types";

const matchSchema: Schema<DBMatchType> = new Schema({
    division: { type: String, required: true },
    matchNumber: { type: String, required: true },
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    gym: { type: String },
    update: { type: Boolean, default: false }
});

const Match: Model<DBMatchType> = mongoose.models.Match || mongoose.model<DBMatchType>("Match", matchSchema);

export default Match;
