import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("CheckServiceMultiple", () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    [mockRepository1, mockRepository2],
    mockSuccessCallback,
    mockErrorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasSuccess = await checkServiceMultiple.execute(
      "https://www.google.com"
    );

    expect(wasSuccess).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasSuccess = await checkServiceMultiple.execute(
      "https://www.googleeeeeeeeee.com"
    );

    expect(wasSuccess).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
