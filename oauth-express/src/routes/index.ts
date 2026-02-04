import { Request, Response } from "express";
import {setupGoogleAuthRoutes} from "./googleAuthRouter"
import {Application} from "express";
import {setupGenericAuthRoutes} from "./genericAuthRouter";
import {setupLoginWithCredentialsRoutes} from "./loginWithCredentialsRouter";
import {oauthLog} from "../lib/log";

export default (app: Application) => {
    console.log('[OAUTH] Entry reached');
    setupGenericAuthRoutes(app)
    setupLoginWithCredentialsRoutes(app)
    setupGoogleAuthRoutes(app)

    app.use((req: Request, res: Response) => {
        oauthLog('verify', req, {
            action: 'unknown-route',
            outcome: 'not-found',
        });

        res.status(404).json({ error: 'Not found' });
    });
}