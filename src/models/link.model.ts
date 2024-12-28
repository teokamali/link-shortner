import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
