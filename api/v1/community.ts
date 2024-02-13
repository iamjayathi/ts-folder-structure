import CommunityController from "@controllers/v1/book";
import express from "express";

const BookRouter = express.Router();

BookRouter.get("/", BookController.getAll);
BookRouter.get("/:id", BookController.getSingle);

export default BookRouter;