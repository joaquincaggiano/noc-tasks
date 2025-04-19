import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("LogEntity", () => {
  const logData = {
    origin: "log.entity.test.ts",
    message: "test-message",
    level: LogSeverityLevel.high,
  };

  test("should create a log entity instance", () => {
    const log = new LogEntity(logData);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logData.message);
    expect(log.level).toBe(logData.level);
    expect(log.origin).toBe(logData.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity fromJson", () => {
    const json = `{"message":"http://localhost:3000 is not working. TypeError: fetch failed","level":"high","createdAt":"2025-04-09T20:41:20.010Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(
      "http://localhost:3000 is not working. TypeError: fetch failed"
    );
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity fromObject", () => {
    const log = LogEntity.fromObject(logData);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logData.message);
    expect(log.level).toBe(logData.level);
    expect(log.origin).toBe(logData.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
