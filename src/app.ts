import express from "express";
import cors from "cors";
import commentRouter from "./routers/comment.router";
import errorHandler from "./middlewares/errorHandler";
import eventRouter from "./routers/event.router";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(
  cors({
    origin:
      NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/comments", commentRouter);
app.use("/events", eventRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅Server is running ${PORT} ${NODE_ENV}`);
});
