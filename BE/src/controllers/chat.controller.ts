import type { Request, Response } from "express";
import { chat } from "../services/chat.service.js";

export async function sendMessage(req: Request, res: Response) {
    const { message, timeZone } = req.body;

    const reply = await chat({message, timeZone});

    res.json({
        reply,
    });
}