export const httpOptions = {
  "Content-type": "application/json",
  "Cache-control": "no-storage",
  "X-XSS-Protection": "1; mode=block",
  "Strict-transport-policy":"max-age=31536000; preload",
  "X-Content-Type-Options":"nosniff",
  "X-Frame-Options":"DENY",
  "Referer-policy":"no-referrer"
};
