import express from "express";
import cookieParser from 'cookie-parser';

// import helmet from "helmet";
// import cors from "cors";

const FrameworkLoader = (app: express.Application) => {
//   app.use(helmet());
//   app.use(cors());
  app.use(cookieParser());
};

export default FrameworkLoader;
