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
}
