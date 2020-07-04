import config from "config"

export const DB_HOST: string = config.get("DB.HOST")
export const DB_PORT: string = config.get("DB.PORT")
export const DB_NAME: string = config.get("DB.NAME")
export const DB_USERNAME: string = config.get("DB.CREDS.USERNAME")
export const DB_PASSWORD: string = config.get("DB.CREDS.PASSWORD")

const LOCAL_DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const DEPLOYED_DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

export const DB_URI = DB_USERNAME && DB_PASSWORD ? DEPLOYED_DB_URI : LOCAL_DB_URI
