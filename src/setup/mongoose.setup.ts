import mongoose from "mongoose"
import logger from "@utils/logger"

// Create the database connection
export async function connectMongo(dbURI: string) {
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on("connected", () => {
        logger.info("Mongoose default connection open to " + dbURI)
    })

    // If the connection throws an error
    mongoose.connection.on("error", (err: any) => {
        logger.error("Mongoose default connection error: " + err)
    })

    // When the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        logger.info("Mongoose default connection disconnected")
    })

    await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

export async function disconnectMongo() {
    logger.info("Mongoose default connection disconnected through app termination")
    await mongoose.connection.close()
}
