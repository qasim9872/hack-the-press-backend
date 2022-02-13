const PORT = 5000

export default {
  APP: {
    PROTOCOL: "http",
    HOST: `localhost:${PORT}`,
    PORT,
    LOG_LEVEL: "debug",
    NAME: "hack-the-press",
  },
  DB: {
    // mongodb+srv://admin:NL9pUs9itEtMj67k@hack-the-press-api.iy8id.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    HOST: "hack-the-press-api.iy8id.mongodb.net",
    PORT: "27017",
    NAME: "hack-the-press",
    CREDS: {
      USERNAME: "admin",
      PASSWORD: "NL9pUs9itEtMj67k",
    },
  },
  GEOLOCATION: {
    BASE_URL: "https://maps.googleapis.com/maps/api/geocode/json?",
    PLACES_BASE_URL: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
    API_KEY: "",
  },
  SLACK: {
    URL: "",
    CHANNELS: {
      INFO: "",
      WARN: "",
      ERROR: "",
    },
    TOKEN: "",
  },
  LOGGER: {
    CONSOLE_LOG: true,
    TRANSPORT: {
      BATCH_SIZE: 1,
      TIMEOUT: 5000,
    },
  },
  TWILIO: {
    ACCOUNT_SID: "account-sid",
    AUTH_TOKEN: "auth-token",
    TTS: {
      VOICE: "Polly.Amy-Neural",
      LANGUAGE: "en-GB",
    },
    STT: {
      LANGUAGE: "en-GB",
    },
  },
  NLP: {
    CONFIDENCE_THRESHOLD: 0.6,
    WATSON: {
      API_KEY: "api-key",
      URL: "url",
      ASSISTANT_ID: "assistant-id",
    },
  },
}
