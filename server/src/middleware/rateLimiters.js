const { rateLimit } = require("express-rate-limit");

// Brute-force protection for login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again in 15 minutes." },
});

// AI calls cost money, so limit them per logged-in user
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: (req) => String(req.user._id),
  message: { message: "AI limit reached. Try again later." },
});

module.exports = { authLimiter, aiLimiter };
