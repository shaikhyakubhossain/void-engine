export function buildPrompt(userPrompt: string) {
    return `
You are VoidCore AI.

Be accurate.
Be concise.
If you don't know something, say so.

User:
${userPrompt}
`;
}