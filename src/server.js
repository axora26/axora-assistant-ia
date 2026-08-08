import "dotenv/config";
import express from "express";
import { askAssistant } from "./assistant.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "AXORA Assistant IA",
    model: process.env.OPENAI_MODEL || "gpt-5.6",
    apiConfigured: Boolean(process.env.OPENAI_API_KEY),
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const model = typeof req.body?.model === "string" ? req.body.model.trim() : undefined;
    const totalLength = messages.reduce((sum, item) => sum + (typeof item?.content === "string" ? item.content.length : 0), 0);

    if (!messages.length) {
      return res.status(400).json({ error: "La conversation est obligatoire." });
    }

    if (totalLength > 60000) {
      return res.status(413).json({ error: "La conversation est trop longue. Démarrez une nouvelle session." });
    }

    const result = await askAssistant({ messages, model });
    return res.json({ answer: result.text, responseId: result.id, model: result.model });
  } catch (error) {
    console.error("Assistant error:", error?.message || error);
    const status = error?.status && Number.isInteger(error.status) ? error.status : 500;
    return res.status(status >= 400 && status < 600 ? status : 500).json({
      error: status === 401 ? "Configuration API OpenAI invalide." : "Impossible de générer la réponse.",
    });
  }
});

app.use((_req, res) => res.status(404).json({ error: "Ressource introuvable." }));

app.listen(port, () => {
  console.log(`AXORA Assistant IA disponible sur http://localhost:${port}`);
});
