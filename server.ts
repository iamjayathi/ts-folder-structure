// import Cache from "@universe/v1/libraries/cache";
// import Logger from "@universe/v1/libraries/logger";
import express from "express";

import FrameworkLoader from "@loaders/v1/framework";
import Env from "@loaders/v1/env";
import Database from "@loaders/v1/database";

import CommunityRouter from "@api/v1/community";
import UserRouter from "@api/v1/user";
import MemberRouter from "@api/v1/member";
import RoleRouter from "@api/v1/role";


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
  app.use("/v1/community", CommunityRouter);
  app.use("/v1/user", UserRouter);
  app.use("/v1/member", MemberRouter);
  app.use("/v1/role", RoleRouter);

  return app;
};

export default server;