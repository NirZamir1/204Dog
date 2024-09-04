import mongoose from "mongoose";

const scoreSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "please enter a name"] },
    score: { type: Number, required: [true, "please enter a score"] },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);
export default Score;
