// oauth-express/auth/local.ts
import { Strategy as LocalStrategy } from 'passport-local';
import {PassportStatic} from "passport";
import {fetchKeystoneUserByEmailAndPassword} from "../keystone";
import {oauthLog} from "../log";

export const initLocalStrategy = (passport: PassportStatic) => {
    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                oauthLog('strategy', null as any, {
                    stage: 'before-keystone',
                    email,
                    hasEmail: !!email,
                    hasPassword: !!password,
                });
                const user = await fetchKeystoneUserByEmailAndPassword(email, password);
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials' });
                }
                return done(null, user);
            } catch (err) {
                const cause = err instanceof Error ? err.message : String(err);
                oauthLog('strategy', null, {
                    stage: 'keystone-error',
                    cause
                });
                return done(err);
            }
        }
    ));
};
