const PORT = 5000

export default {
    APP: {
        HOST: `localhost:${PORT}`,
        PORT,
        LOG_LEVEL: "debug",
        NAME: "twilio-voice",
    },
    DB: {
        HOST: "localhost",
        PORT: "27017",
        NAME: "twilio",
        CREDS: {
            USERNAME: "",
            PASSWORD: "",
        },
    },
    TWILIO: {
        ACCOUNT_SID: "account-sid",
        AUTH_TOKEN: "auth-token",
    },
}
