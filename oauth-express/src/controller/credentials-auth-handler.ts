import {OAuthControllerInterface} from "./OAuthControllerInterface";
import {ErrorWrapper} from "../error-handler";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { issueJwt } from "../lib/jwt";
import {oauthLog} from "../lib/log";

export class LoginWithCredentialsHandler implements OAuthControllerInterface {
    errorWrapper = new ErrorWrapper()

    authenticate = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err: unknown, user: any, info: any) => {
            oauthLog('verify', req, {
                stage: 'post-auth',
                err: err ? String(err) : null,
                hasUser: !!user,
                info,
            });
            if (err || !user) {
                oauthLog('verify', req, {
                    outcome: 'rejected',
                    error: info?.message
                });
                return res.status(401).json({ error: info?.message || 'Login failed' })
            }

            const token = issueJwt(user)

            oauthLog('issue', req, {
                outcome: 'issued',
            });

            res.json({ token, user })
        })(req, res, next)
    }
    loginCallback = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err: unknown, user: any, info: any) => {
            oauthLog('verify', req, {
                stage: 'post-auth',
                err: err ? String(err) : null,
                hasUser: !!user,
                info,
            });
            if (err || !user) {
                oauthLog('verify', req, {
                    outcome: 'rejected',
                    error: info?.message
                });
                return res.status(401).json({ error: info?.message || 'Login failed' })
            }

            const token = issueJwt(user)

            oauthLog('issue', req, {
                outcome: 'issued',
            });

            res.json({ token, user })
        })(req, res, next)
    }
}