import CommunityController from "@controllers/v1/community";
import express from "express";

const CommunityRouter = express.Router();

CommunityRouter.post("/",auth,CommunityController.create);
CommunityRouter.get("/",auth,CommunityController.getAll);
CommunityRouter.get("/:id/members",CommunityController.getMembers);
CommunityRouter.get("/me/owner",auth,CommunityController.getOwned);
CommunityRouter.get("/me/member",auth,CommunityController.getJoined);

export default CommunityRouter;