import commentRepository from "../repositories/comment.repository";
import { CreateComentInfo, GetCommentCondition } from "../types/comment.type";
import {
  comparePassword,
  filterSensitiveCommentData,
  hashPassword,
} from "../utils/comment.util";

async function createComment(info: CreateComentInfo) {
  const hashedPassword = await hashPassword(info.password);

  const newComment = await commentRepository.create({
    ...info,
    password: hashedPassword,
  });

  const comment = filterSensitiveCommentData(newComment);

  return comment;
}

async function getComments(condition: GetCommentCondition) {
  const { comeents, totalCount, totalPages } =
    await commentRepository.getComentsByFcOuid(condition);

  return { comeents, totalCount, totalPages };
}

async function deleteComment(commentId: string, userPassword: string) {
  const exist = await commentRepository.findById(commentId);

  if (!exist) {
    throw new Error("존재하지 않는 댓글입니다.");
  }

  const isMatch = await comparePassword(userPassword, exist.password);

  if (!isMatch) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const deletedComment = await commentRepository.deleteComment(commentId);

  return filterSensitiveCommentData(deletedComment);
}

export default {
  createComment,
  getComments,
  deleteComment,
};
