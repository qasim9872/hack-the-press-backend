const PORT = 5000

export default {
    APP: {
        HOST: `localhost:${PORT}`,
        PORT,
        LOG_LEVEL: "debug",
        NAME: "testing-startup-poc",
    },
    DB: {
        HOST: "localhost",
        PORT: "27017",
        NAME: "POC",
        CREDS: {
            USERNAME: "",
            PASSWORD: "",
        },
    },
}
