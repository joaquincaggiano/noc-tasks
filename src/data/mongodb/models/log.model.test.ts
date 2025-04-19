import { MongoDatabase } from "../init";
import { envs } from "../../../config/plugins/envs.plugin";
import mongoose, { Schema } from "mongoose";
import { LogModel } from "./log.model";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";
describe("Log Model", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME!,
      mongoUrl: envs.MONGO_URL!,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("should return LogModel", async () => {
    const logData = {
      message: "test-message",
      origin: "log.model.test.ts",
      level: LogSeverityLevel.low,
    };
    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test("should return the schema object", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function), required: true },
        level: {
          type: expect.any(Function),
          enum: { low: "low", medium: "medium", high: "high" },
          default: "low",
        },
        createdAt: expect.any(Object),
      })
    );
  });
});
