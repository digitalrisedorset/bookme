import {ErrorWrapper} from "../error-handler";
import { Request, Response } from "express";
import {getKeystoneUserById} from "../lib/keystone";
import {oauthLog} from "../lib/log";

export class GenericAuthHandler {
    errorWrapper = new ErrorWrapper()

    logout = (req: Request, res: Response) => {
        req.logout(() => {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.json({ success: true });
            });
        });
    }

    refreshSession = async (req: Request, res: Response) => {
         try {
             const userId = (req.user as { id: string })?.id;

             if (!userId) {
                 oauthLog('verify', req, {
                     outcome: 'no-session',
                 });
                 res.status(401).json({error: 'Not logged in'});
             }

            const updatedUser = await getKeystoneUserById(userId);
            req.user = updatedUser
            if (req.session.passport) {
                req.session.passport.user = updatedUser;
            }

            // ✅ Mark session as modified and explicitly save
            req.session.touch();      // updates session timestamp
            req.session.save((err) => {
                if (err) {
                    oauthLog('verify', req, {
                        outcome: 'error',
                        error: err instanceof Error ? err.message : 'unknown',
                    });
                    res.status(500).json({error: 'Could not save session'});
                }

                oauthLog('verify', req, {
                    outcome: 'active-session',
                });

                res.json({user: updatedUser});
            });
        } catch (err) {
             oauthLog('verify', req, {
                 outcome: 'error',
                 error: err instanceof Error ? err.message : 'unknown',
             });
             res.status(500).json({ error: 'Internal error' });
        }
    }
}