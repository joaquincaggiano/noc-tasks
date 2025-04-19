import path from "path";
import fs from "fs";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("FileSystemDatasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });
  test("should create log files if they don't exist", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", async () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test message",
      origin: "file-system.datasource.test.ts",
    });

    await fileSystemDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });
  test("should save a log in logs-all.log and logs-medium.log", async () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test message",
      origin: "file-system.datasource.test.ts",
    });

    await fileSystemDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));

    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-high.log", async () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test message",
      origin: "file-system.datasource.test.ts",
    });

    await fileSystemDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));

    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test message",
      origin: "file-system.datasource.test.ts",
    });

    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test message",
      origin: "file-system.datasource.test.ts",
    });

    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test message",
      origin: "file-system.datasource.test.ts",
    });

    await fileSystemDatasource.saveLog(logLow);
    await fileSystemDatasource.saveLog(logMedium);
    await fileSystemDatasource.saveLog(logHigh);

    const logsLow = await fileSystemDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await fileSystemDatasource.getLogs(
      LogSeverityLevel.medium
    );
    const logsHigh = await fileSystemDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });

  test("should not throw an error if path exists", () => {
    new FileSystemDatasource();
    new FileSystemDatasource();

    expect(true).toBeTruthy();
  });

  test("should throw an error if severity level is invalid", async () => {
    const fileSystemDatasource = new FileSystemDatasource();
    const customSeverityLevel = "SUPER_MEGA_HIGH" as LogSeverityLevel;

    try {
      await fileSystemDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;
      console.log(errorString);
      expect(errorString).toContain(
        `${customSeverityLevel} is not a valid log severity level`
      );
    }
  });
});
