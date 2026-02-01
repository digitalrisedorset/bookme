import express, {Application, NextFunction} from 'express'
import { config } from "../config";
import { ErrorWrapper } from "../error-handler";
import {initialiseApp} from "./initilisers";

export const startServer = async () => {
    const app: Application = express()
    const port = config.port
    const errorWrapper = new ErrorWrapper()

    app.use((req, _res, next) => {
        console.log(
            '[OAUTH]',
            req.method,
            req.originalUrl,
            {
                hasAuthHeader: Boolean(req.headers.authorization),
                hasCookie: Boolean(req.headers.cookie),
                contentType: req.headers['content-type'],
            }
        );
        next();
    });

    await initialiseApp(app)

    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error: unknown) {
        errorWrapper.handle(error)
    }
}
