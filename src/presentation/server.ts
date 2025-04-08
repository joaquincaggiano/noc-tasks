import { CronService } from "../cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";

const fileSystemlogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  static async start() {
    console.log("Server is running...");

    const job = CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";

      new CheckService(
        fileSystemlogRepository,
        () => console.log(`Service ${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
