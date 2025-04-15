import { Schema, model } from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const LogSchema = new Schema({
  message: { type: String, required: true },
  origin: { type: String, required: true },
  level: {
    type: String,
    enum: LogSeverityLevel,
    default: LogSeverityLevel.low,
  },
  createdAt: { type: Date, default: new Date() },
});

export const LogModel = model("Log", LogSchema);
