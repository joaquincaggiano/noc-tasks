import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase } from "../../data/mongodb/init";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongodb/models/log.model";

describe("MongoLogDatasource", () => {
  const mongoLogDatasource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: "test",
    origin: "mongo-log.datasource.test.ts",
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await mongoLogDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalledWith(
      "Log saved in Mongo",
      expect.any(String)
    );
  });

  test("should get logs", async () => {
    await mongoLogDatasource.saveLog(log);
    await mongoLogDatasource.saveLog(log);
    await mongoLogDatasource.saveLog(log);

    const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(3);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
