import express, {Application, NextFunction} from 'express'
import { config } from "../config";
import { ErrorWrapper } from "../error-handler";
import {initialiseApp} from "./initilisers";

export const startServer = async () => {
    const app: Application = express()
    const port = config.port
    const errorWrapper = new ErrorWrapper()

    await initialiseApp(app)

    try {
        app.listen(port, () => {
            console.log('[BOOT] Loaded configuration:', JSON.stringify(config, null, 2));
        })
    } catch (error: unknown) {
        errorWrapper.handle(error)
    }
}
