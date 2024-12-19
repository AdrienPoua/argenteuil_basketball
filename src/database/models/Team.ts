import mongoose, { Schema } from "mongoose";

const trainingSchema = new Schema({
    day: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    gym: { type: String, required: true },
  });

// Define a sub-schema for Member
const teamSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  coach: { type: String },
  division: { type: String },
  training: { type: [trainingSchema]} 
});

// Define the training model

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
