import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb/init";

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
};

main();
