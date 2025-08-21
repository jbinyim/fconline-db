import express from "express";
import commentController from "../controllers/comment.controller";
import { ipAddressMiddleware } from "../middleware/ipAddressMiddleware";

const commentRouter = express.Router();

commentRouter.post(
  "/create/:fcOuid",
  ipAddressMiddleware,
  commentController.creasteComment
);
commentRouter.get("/get/:fcOuid", commentController.getComments);
commentRouter.delete("/delete/:commentId", commentController.deleteComment);

commentRouter.post(
  "/:commentId/like",
  ipAddressMiddleware,
  commentController.toggleLike
);

export default commentRouter;
