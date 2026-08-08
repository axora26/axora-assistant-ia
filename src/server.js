import "dotenv/config";
import express from "express";
import { askAssistant } from "./assistant.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "AXORA Assistant IA" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

    if (!message) {
      return res.status(400).json({ error: "Le message est obligatoire." });
    }

    if (message.length > 20000) {
      return res.status(413).json({ error: "Le message est trop long." });
    }

    const answer = await askAssistant(message);
    return res.json({ answer });
  } catch (error) {
    console.error("Assistant error:", error?.message || error);
    return res.status(500).json({ error: "Impossible de générer la réponse." });
  }
});

app.listen(port, () => {
  console.log(`AXORA Assistant IA disponible sur http://localhost:${port}`);
});
