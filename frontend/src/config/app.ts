// App configuration
export const APP_CONFIG = {
  // PIN is read from environment variable for security
  ADMIN_PIN: import.meta.env.VITE_APP_PIN,
  API_BASE_URL: 'http://localhost:8080/api',
} as const;