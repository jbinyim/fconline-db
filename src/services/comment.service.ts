import prisma from "../configs/prisma.config";
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
  const { comments, totalCount, totalPages } =
    await commentRepository.getComentsByFcOuid(condition);

  return { comments, totalCount, totalPages };
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

async function toggleLike(commentId: string, ipAddress: string) {
  // 댓글 여부 확인
  const comment = await commentRepository.findById(commentId);

  if (!comment) {
    return {
      success: false,
      error: "코멘드를 찾을 수 없습니다.",
      likeCount: 0,
    };
  }

  // 이미 좋아요를 눌렀는지 확인
  const existingLike = await commentRepository.findByCommentIdAndIp(
    commentId,
    ipAddress
  );

  let action: "liked" | "unliked";
  let likeCount: number;

  if (existingLike) {
    //좋아요 취소
    await prisma.$transaction([
      prisma.commentLike.delete({
        where: { id: existingLike.id },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: { like: { decrement: 1 } },
      }),
    ]);

    action = "unliked";
    likeCount = comment.like - 1;
  } else {
    // 좋아요 추가
    await prisma.$transaction([
      prisma.commentLike.create({
        data: {
          commentId,
          ipAddress,
        },
      }),
      prisma.comment.update({
        where: { id: commentId },
        data: { like: { increment: 1 } },
      }),
    ]);

    action = "liked";
    likeCount = comment.like + 1;
  }

  return {
    success: true,
    action,
    likeCount,
  };
}

export default {
  createComment,
  getComments,
  deleteComment,
  toggleLike,
};
