import express from "express";
import { corsMiddleware } from "./config/cors.js";
import chatRoutes from "./routes/chat.routes.js";

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

app.use("/api/chat", chatRoutes);

export default app;