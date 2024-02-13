import UserController from "@controllers/v1/user";
import express from "express";

const UserRouter = express.Router();

UserRouter.post("/signup",UserController.signup);
UserRouter.post("/signin",UserController.signin);
UserRouter.get("/me",UserController.getMe);

UserRouter.post("/",auth,UserController.create);
UserRouter.get("/",auth,UserController.getAll);

export default UserRouter;