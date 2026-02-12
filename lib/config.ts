export const config = {
  commercialMode: process.env.COMMERCIAL_MODE === "true",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  openRouterBaseUrl: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  openRouterVisionModel: process.env.OPENROUTER_MODEL_VISION || "google/gemini-2.5-flash",
  openRouterSummaryModel: process.env.OPENROUTER_MODEL_SUMMARY || "google/gemini-2.5-pro"
};

export const requiredServerEnv = [
  "OPENROUTER_API_KEY",
  "AMAP_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_PRICE_ID"
];
