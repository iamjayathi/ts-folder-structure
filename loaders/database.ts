import Logger from "@universe/v1/libraries/logger";
import { Db, MongoClient } from "mongodb";
import Env from "./env";

class Database {
  static instance: Db;

  static client: MongoClient;

  static async Loader() {
    const uri = `mongodb://${Env.variable.DATABASE_USERNAME}:${Env.variable.DATABASE_PASSWORD}@${Env.variable.DATABASE_HOST}:${Env.variable.DATABASE_PORT}/`;

    try {
      const client = new MongoClient(uri);
      await client.connect();
      Database.client = client;
      Database.instance = client.db(Env.variable.DATABASE_NAME);
    } catch (e) {
      Logger.instance.error(e);
    }
  }
}

export default Database;