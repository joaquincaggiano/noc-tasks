import { CronService } from "../cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {
  static async start() {
    console.log("Server is running...");

    const job = CronService.createJob("*/5 * * * * *", () => {
      console.log("You will see this message every second");
      new CheckService().execute("https://www.google.com");
    });
  }
}
