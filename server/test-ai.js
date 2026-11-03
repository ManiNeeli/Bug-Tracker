require("dotenv").config();

const key = process.env.GEMINI_API_KEY;
const wanted = process.env.GEMINI_MODEL || "gemini-2.5-flash";

(async () => {
  // 1. List models that support generateContent
  const list = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models?key=" + key,
  ).then((r) => r.json());

  const usable = (list.models || [])
    .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => m.name.replace("models/", ""));

  console.log("Model in use:", wanted);
  console.log("Is it available?", usable.includes(wanted));
  console.log("Flash models available:");
  console.log(usable.filter((n) => n.includes("flash")).join("\n"));

  // 2. Try a real call and print the real error
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${wanted}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Reply with JSON: {"ok":true}' }] }],
      }),
    },
  );

  console.log("\nStatus:", res.status);
  console.log(JSON.stringify(await res.json(), null, 2).slice(0, 800));
})();
