import dotenv from 'dotenv';
dotenv.config();

function isProduction() {
    return process.env.APP_ENV === 'live'
}

export interface AuthCookieConfig {
    domain: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'none' | 'strict';
    maxAge?: number;
    path: string;
}

export type configInfo = {
    port: number;
    frontendUrl: string;
    oauthUrl: string;
    route: {
        prefix: string;
        security: string;
    },
    debug: {
        enabled?: boolean;
        traceFilter?: string;
    },
    auth: {
        cookie: AuthCookieConfig;
        returnSlug: string
    },
    security: {
        cloudflare: {
            siteKey: string;
        }
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 3002: Number(process.env.PORT),
    frontendUrl: (process.env.FRONTEND_HOST === undefined)?'http://localhost:5173':process.env.FRONTEND_HOST,
    oauthUrl: (process.env.OAUTH_HOST === undefined)?'http://localhost:3002':process.env.OAUTH_HOST,
        /**
     * Routes access
     */
    route: {
        prefix: '/auth',
        security: '/security'
    },
    debug: {
        enabled: process.env.AUTH_DEBUG === '1',
        traceFilter: process.env.AUTH_TRACE_FILTER,
    },
    auth: {
        cookie: isProduction()
            ? {
                domain: process.env.COOKIE_DOMAIN as string,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
            }
            : {
                domain: process.env.COOKIE_DOMAIN as string,
                httpOnly: false,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
            },
        returnSlug: process.env.RETURN_TO?? ''
    },
    security: {
        cloudflare: {
            siteKey: process.env.CLOUDFLARE_TURNSTILE_SECRET?? '',
        }
    }
}



