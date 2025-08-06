import express from "express";
import commentController from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/create/:fcOuid", commentController.creasteComment);
commentRouter.get("/get/:fcOuid", commentController.getComments);
commentRouter.delete("/delete/:commentId", commentController.deleteComment);

export default commentRouter;
