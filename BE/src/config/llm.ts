import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY!,
    baseURL: "https://openrouter.ai/api/v1",
});