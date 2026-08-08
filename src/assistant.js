import fs from "node:fs/promises";
import OpenAI from "openai";

const promptUrl = new URL("../prompts/system.md", import.meta.url);
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function normalizeMessages(messages = []) {
  return messages
    .filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string")
    .map((item) => ({ role: item.role, content: item.content.trim() }))
    .filter((item) => item.content)
    .slice(-20);
}

export async function askAssistant({ messages, model }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY manquante côté serveur.");
  }

  const systemPrompt = await fs.readFile(promptUrl, "utf8");
  const input = normalizeMessages(messages);

  if (!input.length) {
    throw new Error("Aucun message valide à traiter.");
  }

  const response = await client.responses.create({
    model: model || process.env.OPENAI_MODEL || "gpt-5.6",
    instructions: systemPrompt,
    input,
    reasoning: { effort: "medium" },
  });

  return {
    text: response.output_text,
    id: response.id,
    model: response.model,
  };
}
