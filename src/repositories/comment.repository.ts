import prisma from "../configs/prisma.config";
import { CreateComentInfo, GetCommentCondition } from "../types/comment.type";

async function create(info: CreateComentInfo) {
  const comment = await prisma.comment.create({
    data: {
      nickname: info.nickname,
      text: info.text,
      password: info.password,
      ipAddress: info.ipAddress,
      fcOuid: info.fcOuid,
    },
  });

  return comment;
}

async function getComentsByFcOuid(condition: GetCommentCondition) {
  const skip = (condition.offset - 1) * condition.limit; // 2페이지라면 5개 건너뒤고 6개부터 조회
  const orderBy =
    condition.category === "desc"
      ? { createdAt: "desc" as const }
      : { like: "desc" as const }; // 최신순 또는 좋아요 순 정렬

  const comeents = await prisma.comment.findMany({
    where: {
      fcOuid: condition.fcOuid,
    },
    select: {
      id: true,
      nickname: true,
      text: true,
      createdAt: true,
      like: true,
      ipAddress: true,
      password: false,
    },
    orderBy, // 정렬조건
    skip, // 건너뛸수
    take: condition.limit, // 몇 개까지 가져올수
  });

  const totalCount = await prisma.comment.count({
    where: {
      fcOuid: condition.fcOuid,
    },
  });

  return {
    comeents,
    totalCount,
    totalPages: Math.ceil(totalCount / condition.limit),
  };
}

async function findById(commentId: string) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  return comment;
}

async function deleteComment(commentId: string) {
  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return comment;
}

export default {
  create,
  getComentsByFcOuid,
  findById,
  deleteComment,
};
