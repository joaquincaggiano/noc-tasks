import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemlogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  static async start() {
    console.log("Server is running...");

    // const sendEmailLogs = new SendEmailLogs(
    //   emailService,
    //   fileSystemlogRepository
    // );
    // sendEmailLogs.execute("jcaggiano@desaway.es");

    // CronService.createJob("*/5 * * * * *", () => {
    //   // const url = "http://localhost:3000";
    //   const url = "https://www.google.com";

    //   new CheckService(
    //     fileSystemlogRepository,
    //     () => console.log(`Service ${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
