import express from "express";
// import Cache from "@universe/v1/libraries/cache";
import FrameworkLoader from "@loaders/v1/framework";
// import Logger from "@universe/v1/libraries/logger";
import Env from "@loaders/v1/env";
// import BookRouter from "@api/v1/book";
import Database from "@loaders/v1/database";

const server = async (): Promise<express.Application> => {
  const app = express();

  // Loaders

  Env.Loader();
//   Logger.Loader();
//   await Cache.Loader();
  await Database.Loader();
  FrameworkLoader(app);

  // Middlewares

  // Routes
  app.use("/v1/books", BookRouter);

  return app;
};

export default server;