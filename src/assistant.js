import fs from "node:fs/promises";
import OpenAI from "openai";

const promptUrl = new URL("../prompts/system.md", import.meta.url);

export async function askAssistant(message) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY manquante côté serveur.");
  }

  const systemPrompt = await fs.readFile(promptUrl, "utf8");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.2",
    instructions: systemPrompt,
    input: message,
  });

  return response.output_text;
}
