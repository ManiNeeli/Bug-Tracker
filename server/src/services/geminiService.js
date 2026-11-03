const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PRIORITIES = ["Low", "Medium", "High", "Critical"];
const CATEGORIES = [
  "UI",
  "Backend",
  "Database",
  "Performance",
  "Security",
  "Other",
];

const MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.8-flash",
  process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const callModel = async (modelName, prompt) => {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: { responseMimeType: "application/json" },
  });
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

const analyzeBug = async (description) => {
  const prompt = `Analyze this software bug report and respond as JSON with exactly these keys:
"priority": one of ${PRIORITIES.join(", ")}
"category": one of ${CATEGORIES.join(", ")}
"suggestion": a short suggested fix (max 3 sentences)

Bug report:
${description}`;

  let lastError;

  for (const modelName of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const data = await callModel(modelName, prompt);
        return {
          priority: PRIORITIES.includes(data.priority)
            ? data.priority
            : "Medium",
          category: CATEGORIES.includes(data.category)
            ? data.category
            : "Other",
          suggestion: data.suggestion || "",
        };
      } catch (err) {
        lastError = err;
        console.error(
          `AI ${modelName} attempt ${attempt + 1} failed:`,
          err.message,
        );
        await sleep(1500);
      }
    }
  }

  throw lastError;
};

module.exports = analyzeBug;
