import RoleController from "@controllers/v1/role";
import express from "express";

const RoleRouter = express.Router();

RoleRouter.post("/",auth,RoleController.create);
RoleRouter.get("/",auth,RoleController.getAll);


export default RoleRouter;