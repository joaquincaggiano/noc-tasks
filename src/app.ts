import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb/init";
import { LogModel } from "./data/mongodb/models/log.model";
import { LogSeverityLevel } from "./domain/entities/log.entity";

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const newLog = await LogModel.create({
    message: "Test message from Mongo",
    level: LogSeverityLevel.low,
    origin: "src/app.ts",
  });

  await newLog.save();

  console.log(newLog);

  const logs = await LogModel.find();

  console.log(logs);

  // Server.start();
};

main();
