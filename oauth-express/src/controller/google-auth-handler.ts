import {OAuthControllerInterface} from "./OAuthControllerInterface";
import {ErrorWrapper} from "../error-handler";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { issueJwt } from "../lib/jwt";
import {oauthLog} from "../lib/log";
import { config } from "../config";

export class GoogleAuthHandler implements OAuthControllerInterface {
    errorWrapper = new ErrorWrapper()

    authenticate = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
    }

    loginCallback = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', (err: unknown, user: any) => {
            if (err || !user) {
                oauthLog('verify', req, {
                    outcome: 'rejected',
                });
                return res.redirect('/')
            }

            const token = issueJwt(user)

            oauthLog('issue', req, {
                outcome: 'issued',
            });

            const redirectUrl = `${config.frontendUrl}/auth-callback?token=${token}`;
            res.redirect(redirectUrl);
        })(req, res, next)
    }
}