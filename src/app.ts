import express from "express";
import cors from "cors";
import commentRouter from "./routers/comment.router";
import errorHandler from "./middlewares/errorHandler";

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/comments", commentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅Server is running ${PORT}`);
});
