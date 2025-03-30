
// Get Environment Variables
export const apiKey = process.env.API_KEY;
export const logLevel = process.env.LOG_LEVEL || "info"; // Default to "info" if not set
export const port = process.env.RUN_PORT || 8000; // Default to 8000 if not set
