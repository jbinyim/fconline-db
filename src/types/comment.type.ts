export interface CreateComentInfo {
  nickname: string;
  text: string;
  password: string;
  ipAddress: string;
  fcOuid: string;
}

export interface GetCommentCondition {
  fcOuid: string;
  category: "desc" | "popular";
  offset: number;
  limit: number;
}
