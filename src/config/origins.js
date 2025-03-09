const envOrigins = import.meta.env?.VITE_ALLOWED_ORIGINS?.split(",");

const originsConfig = {
  ALLOWED_ORIGINS: envOrigins ?? [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
};

export default originsConfig;
