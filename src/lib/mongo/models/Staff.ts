import mongoose, { Schema } from "mongoose";

// Define a sub-schema for Member
const StaffSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  isEmailDisplayed: { type: Boolean, required: true },
  isNumberDisplayed: { type: Boolean, required: true },
  teams: { type: [String] },
  image: { type: String },
  job: { type: String },
});

// Define the Staff model

const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);

export default Staff;
