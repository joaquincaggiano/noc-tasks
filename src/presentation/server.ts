import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemlogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  static async start() {
    console.log("Server is running...");

    const emailService = new EmailService();

    emailService.sendEmailWithFileSystemLogs("jcaggiano@desaway.es");

    // emailService.sendEmail({
    //   to: "jcaggiano@desaway.es",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h1>Logs de sistema - NOC</h1>
    //     <p>Hola, este es un mensaje de prueba</p>
    //     <p>Ver logs adjuntos</p>
    //   `,
    // });

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
