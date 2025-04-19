import { CronService } from "./cron-service";

describe("CronService", () => {
  const mockOnTick = jest.fn();

  test("should create a cron job", (done) => {
    const cronJob = CronService.createJob("* * * * *", mockOnTick);

    setTimeout(() => {
      expect(mockOnTick).toHaveBeenCalledTimes(2);
      cronJob.stop();
      done();
    }, 2000);
  });
});