const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const analyzeBug = async (description) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
Analyze this software bug report:

${description}

Return only:

Priority:
Category:
Suggested Fix:
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = analyzeBug;
