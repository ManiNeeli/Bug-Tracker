require("dotenv").config();

const key = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

(async () => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Reply with JSON: {"ok":true}' }] }],
      }),
    },
  );
  console.log("Model:", model);
  console.log("Status:", res.status);
  console.log(JSON.stringify(await res.json(), null, 2).slice(0, 600));
})();
