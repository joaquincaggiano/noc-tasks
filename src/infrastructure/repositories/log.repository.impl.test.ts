import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

  test("saveLog should call the datasource", async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "test",
    });

    await logRepositoryImpl.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource", async () => {
    const logs = await logRepositoryImpl.getLogs(LogSeverityLevel.low);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.low
    );
  });
});
