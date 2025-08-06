import { CreateComentInfo } from "../types/comment.type";
import bcrypt from "bcrypt";

// 민감데이터 필터링
export function filterSensitiveCommentData(comment: CreateComentInfo) {
  const { password, ipAddress, ...rest } = comment;

  return rest;
}

// 비밀번호 암호화
export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// 암호화된 비밀번호 비교
export function comparePassword(userPassword: string, dbPassword: string) {
  return bcrypt.compare(userPassword, dbPassword);
}
