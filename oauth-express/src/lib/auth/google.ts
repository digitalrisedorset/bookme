import {PassportStatic} from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import {createOrUpdateUser, KeystoneUser} from "../keystone";
import {config} from "../../config";

dotenv.config();

export const initGoogleStrategy = (passport: PassportStatic) => {
    passport.use(new GoogleStrategy(
        {
            clientID: config.googleClientId,
            clientSecret: config.googleClientSecret,
            callbackURL: `${config.bridgeUrl}/google/auth/callback`,
        },
        async (_accessToken, _refreshToken, profile: Profile, done) => {
            try {
                const keystoneUser = await createOrUpdateUser(profile);
                const sessionUser: KeystoneUser = {
                    id: keystoneUser.id,
                    email: keystoneUser.email,
                    name: keystoneUser.name,
                    provider: keystoneUser.provider,
                };

                done(null, sessionUser);
            } catch (err) {
                done(err);
            }
        }
    ));
};


