import "./services/llm/providers.js";

import express from "express";
import { corsMiddleware } from "./config/cors.js";
import authRouter from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import llmRoutes from "./routes/llm.routes.js";
import conversationRouter from "./routes/conversation.routes.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/llm", llmRoutes);
app.use("/api/conversations", conversationRouter);

export default app;
