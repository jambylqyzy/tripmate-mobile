import { Buffer } from "node:buffer";
import { destinations } from "../src/data/destinations.js";

const languages = { en: "English", ru: "Russian", kk: "Kazakh" };

const catalog = destinations.map(({ id, name, location, description }) => ({
  id,
  name,
  location,
  description,
}));

const validIds = new Set(catalog.map(({ id }) => id));

const schema = {
  type: "object",
  required: ["summary", "days"],
  properties: {
    summary: { type: "string" },
    days: {
      type: "array",
      maxItems: 7,
      items: {
        type: "object",
        required: ["note", "placeIds"],
        properties: {
          note: { type: "string" },
          placeIds: {
            type: "array",
            minItems: 1,
            items: { type: "integer" },
          },
        },
      },
    },
  },
};

export function assistantMiddleware({ provider = "gemini", geminiApiKey } = {}) {
  const useGemini = provider === "gemini";
  let busy = false;

  return async (req, res, next) => {
    if (req.url?.split("?")[0] !== "/api/assistant") return next();

    function send(status, data) {
      res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(JSON.stringify(data));
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return send(405, { error: "invalid" });
    }

    if (
      req.headers["sec-fetch-site"] === "cross-site" ||
      req.headers["content-type"]?.split(";")[0] !== "application/json"
    ) {
      return send(415, { error: "invalid" });
    }

    if (useGemini && !geminiApiKey) {
      console.error("Gemini: GEMINI_API_KEY is missing from .env.local");
      return send(503, { error: "unavailable" });
    }

    let input;
    try {
      const chunks = [];
      let size = 0;

      for await (const chunk of req.iterator({ destroyOnReturn: false })) {
        size += chunk.length;
        if (size > 8192) {
          req.resume();
          return send(413, { error: "invalid" });
        }
        chunks.push(chunk);
      }

      input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return send(400, { error: "invalid" });
    }

    const prompt = typeof input?.prompt === "string" ? input.prompt.trim() : "";

    if (!prompt || prompt.length > 1200 || !Object.hasOwn(languages, input?.language)) {
      return send(400, { error: "invalid" });
    }

    if (busy) return send(429, { error: "busy" });
    busy = true;

    const instructions = `You are TripMate's Kazakhstan travel planner.
Write the summary and daily notes in ${languages[input.language]}.
Return a finished itinerary with one entry per planned day, up to seven days.
Describe the route in summary and what to see each day in note.
Use only place IDs from the catalog. Do not repeat places.
Respect the departure city, trip length, and interests.
Do not invent prices, opening hours, travel times, or trail difficulty.
If the catalog has suitable places, return at least one day.
If no places fit, explain why in summary and return an empty days array.
Catalog: ${JSON.stringify(catalog)}`;

    const url = useGemini
      ? "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent"
      : "http://127.0.0.1:11434/api/chat";

    const headers = { "Content-Type": "application/json" };
    if (useGemini) headers["x-goog-api-key"] = geminiApiKey;

    const body = useGemini
      ? {
          systemInstruction: { parts: [{ text: instructions }] },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseJsonSchema: schema,
          },
        }
      : {
          model: "qwen3:4b",
          stream: false,
          think: false,
          format: schema,
          options: { temperature: 0 },
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: prompt },
          ],
        };

    try {
      console.log("TripMate AI provider:", provider);

      const response = await fetch(url, {
        method: "POST",
        headers,
        signal: AbortSignal.timeout(120_000),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`${provider} HTTP status:`, response.status);
        if (response.status === 429) return send(429, { error: "busy" });
        return send(502, { error: "unavailable" });
      }

      const result = await response.json();
      const output = useGemini
        ? result.candidates?.[0]?.content?.parts
            ?.filter((part) => !part.thought)
            .map((part) => part.text ?? "")
            .join("")
        : result.message?.content;

      const plan = JSON.parse(output || "null");

      if (
        typeof plan?.summary !== "string" ||
        !plan.summary.trim() ||
        !Array.isArray(plan.days) ||
        plan.days.length > 7
      ) {
        console.error(`${provider}: invalid itinerary`);
        return send(502, { error: "unavailable" });
      }

      const used = new Set();

      for (const day of plan.days) {
        if (typeof day?.note !== "string" || !Array.isArray(day.placeIds) || !day.placeIds.length) {
          console.error(`${provider}: invalid itinerary day`);
          return send(502, { error: "unavailable" });
        }

        for (const id of day.placeIds) {
          if (!validIds.has(id) || used.has(id)) {
            console.error(`${provider}: unknown or repeated place ID`);
            return send(502, { error: "unavailable" });
          }
          used.add(id);
        }
      }

      return send(200, plan);
    } catch (error) {
      console.error(`${provider} request failed:`, error.cause?.code || error.name);
      return send(502, { error: "unavailable" });
    } finally {
      busy = false;
    }
  };
}