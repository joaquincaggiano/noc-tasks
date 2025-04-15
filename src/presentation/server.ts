import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  static async start() {
    console.log("Server is running...");

    // const logs = await fileSystemlogRepository.getLogs(
    //   LogSeverityLevel.low
    // );
    // console.log(logs);

    // const sendEmailLogs = new SendEmailLogs(
    //   emailService,
    //   fileSystemlogRepository
    // );
    // sendEmailLogs.execute("jcaggiano@desaway.es");

    // CronService.createJob("*/5 * * * * *", () => {
    //   // const url = "http://localhost:3000";
    //   const url = "https://www.google.com";

    //   new CheckService(
    //     logRepository,
    //     () => console.log(`Service ${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";

      new CheckServiceMultiple(
        [fileSystemLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`Service ${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
