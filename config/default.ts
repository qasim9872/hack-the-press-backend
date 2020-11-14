const PORT = 5000

export default {
    APP: {
        HOST: `localhost:${PORT}`,
        PORT,
        LOG_LEVEL: "debug",
        NAME: "twilio-voice",
    },
    DB: {
        // mongodb+srv://api-user:<password>@cluster0.cwspa.mongodb.net/<dbname>?retryWrites=true&w=majority
        HOST: "cluster0.cwspa.mongodb.net",
        PORT: "27017",
        NAME: "twilio",
        CREDS: {
            USERNAME: "api-user",
            PASSWORD: "g3o3dAbSV1H2dTY0",
        },
    },
    TWILIO: {
        ACCOUNT_SID: "account-sid",
        AUTH_TOKEN: "auth-token",
        TTS: {
            VOICE: "Polly.Amy",
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
