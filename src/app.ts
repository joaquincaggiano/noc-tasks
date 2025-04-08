import { Server } from "./presentation/server";
import { CronJob } from 'cron';

const main = () => {
  Server.start();

  const job = new CronJob(
	'* * * * * *',
	() => {
      console.log("You will see this message every second");
    }
  );
};

main();
