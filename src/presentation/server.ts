import { CronService } from "../cron/cron-service";

export class Server {
  static async start() {
    console.log("Server is running...");

    const job = CronService.createJob("* * * * * *", () => {
      console.log("You will see this message every second");
    });
  }
}
