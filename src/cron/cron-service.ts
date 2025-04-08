import { CronJob } from "cron";

export class CronService {
  static createJob(cronTime: string | Date, onTick: () => void): CronJob {
    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
