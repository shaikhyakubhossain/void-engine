import type { Request, Response } from "express";
import { chat } from "../services/chat.service.js";

export async function sendMessage(req: Request, res: Response) {
    const { message } = req.body;

    const reply = await chat(message);

    res.json({
        reply,
    });
}