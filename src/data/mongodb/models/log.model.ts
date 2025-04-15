import { Schema, model } from "mongoose";

const LogSchema = new Schema({
  message: { type: String, required: true },
  origin: { type: String, required: true },
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  createdAt: { type: Date, default: new Date() },
});

export const LogModel = model("Log", LogSchema);
