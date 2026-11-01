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

const analyzeBug = async (description) => {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `Analyze this software bug report and respond as JSON with exactly these keys:
"priority": one of ${PRIORITIES.join(", ")}
"category": one of ${CATEGORIES.join(", ")}
"suggestion": a short suggested fix (max 3 sentences)

Bug report:
${description}`;

  const result = await model.generateContent(prompt);
  const data = JSON.parse(result.response.text());

  return {
    priority: PRIORITIES.includes(data.priority) ? data.priority : "Medium",
    category: CATEGORIES.includes(data.category) ? data.category : "Other",
    suggestion: data.suggestion || "",
  };
};

module.exports = analyzeBug;
