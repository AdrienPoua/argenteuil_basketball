import mongoose, { Schema } from "mongoose";

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  rank: { type: Number, required: true },
});

const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);

export default FAQ;
