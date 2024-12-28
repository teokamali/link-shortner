import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  visitedCounts: { type: Number, default: 0 }, // New field
});

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);

export type LinkType = {
  _id: string;
  shortId: string;
  longUrl: string;
  created_at: string;
  visitedCounts: number; // Update the type definition
};
