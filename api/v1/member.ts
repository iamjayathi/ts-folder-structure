import MemberController from "@controllers/v1/member";
import express from "express";

const MemberRouter = express.Router();

MemberRouter.post("/",auth,MemberController.add);
MemberRouter.delete("/:id",auth,MemberController.remove);


export default MemberRouter;