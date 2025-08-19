import { NextFunction, Request, Response } from "express";
import commentService from "../services/comment.service";

async function creasteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { fcOuid } = req.params;
    const { nickname, text, password } = req.body;
    const ipAddress = req.clientIp;

    if (!nickname || !text || !password || !ipAddress || !fcOuid) {
      return res
        .status(400)
        .json({ error: "필수 정보가 포함되지 않았습니다!!" });
    }

    const info = {
      nickname,
      text,
      password,
      ipAddress,
      fcOuid,
    };

    const comeent = await commentService.createComment(info);

    res.status(201).json(comeent);
  } catch (e) {
    next(e);
  }
}

async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    const { fcOuid } = req.params;
    const category = (req.query.category as "desc" | "popular") || "desc";
    const offset = parseInt(req.query.offset as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;

    if (!fcOuid) {
      return res.status(400).json({ error: "fcOuid가 필요합니다!" });
    }

    const condition = {
      fcOuid,
      category,
      offset,
      limit,
    };

    const comments = await commentService.getComments(condition);

    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { commentId } = req.params;
    const { userPassword } = req.body;

    if (!userPassword || !commentId) {
      return res.status(400).json({ error: "비밀번호가 일치하지 않습니다" });
    }

    const deleteComment = await commentService.deleteComment(
      commentId,
      userPassword
    );

    res.status(200).json(deleteComment);
  } catch (e) {
    next(e);
  }
}

async function toggleLike(req: Request, res: Response, next: NextFunction) {
  try {
    const { commentId } = req.params;
    const ipAddress = req.clientIp;

    if (!commentId || !ipAddress) {
      return res.status(400).json({
        success: false,
        error: "코멘트가 없습니다.",
      });
    }

    const result = await commentService.toggleLike(commentId, ipAddress);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

export default {
  creasteComment,
  getComments,
  deleteComment,
  toggleLike,
};
