import { CronService } from "../cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {
  static async start() {
    console.log("Server is running...");

    const job = CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      
      new CheckService(
        () => console.log(`Service ${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
