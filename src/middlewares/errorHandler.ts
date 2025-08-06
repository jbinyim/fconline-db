import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  const status = err.status || 500;
  const message = err.message || "서버 내부 오류입니다";

  return res.status(status).json({
    sucess: false,
    message,
  });
};

export default errorHandler;
