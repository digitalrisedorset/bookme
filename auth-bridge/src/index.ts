import express, {Application, NextFunction, Request, Response} from "express";
import { config } from "./config";
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {authBridgeLog} from "./lib/log";
import {clearAuthCookie, setAuthCookie} from "./auth/cookiePolicy";

type OAuthLoginResult = { token: string; user?: unknown }

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
}));

app.options('*', cors());

app.use((req: Request, _res: Response, next: NextFunction) => {
    authBridgeLog('request', req);
    next();
});

app.post(`${config.route.prefix}/refresh-session`, async (req: Request, res: Response) => {
    const token = req.cookies?.token; // or header / storage
    const trace = (req as any).authTraceId ?? 'none';

    try {
        authBridgeLog('request', req, {
            action: 'refresh-session',
            test: 'dummy',
            token: token,
            tokenPresent: Boolean(token)
        });

        const oauthRes = await fetch(
            `${process.env.OAUTH_HOST}/auth/refresh-session`,
            {
                method: "POST",
                headers: token
                    ? { Authorization: `Bearer ${token}` }
                    : {},
            }
        );

        authBridgeLog('request', req, {
            action: 'refresh-session',
            tokenPresent: Boolean(token),
            oauthStatus: oauthRes.status,
        });

        if (oauthRes.status === 401 || oauthRes.status === 204) {
            authBridgeLog('verify', req, {
                action: 'refresh-session',
                outcome: 'no-session',
                reason: oauthRes.status === 401 ? 'unauthorised' : 'no-content',
            });
            return res.json({ user: null });
        }

        if (!oauthRes.ok) {
            authBridgeLog('verify', req, {
                action: 'refresh-session',
                outcome: 'error',
                reason: 'oauth_error',
                oauthStatus: oauthRes.status,
            });
            return res.json({ user: null });
        }

        authBridgeLog('verify', req, {
            action: 'refresh-session',
            outcome: 'active-session',
        });
        const json = await oauthRes.json();
        return res.json(json);
    } catch (e) {
        authBridgeLog('verify', req, {
            action: 'refresh-session',
            outcome: 'error',
            reason: 'exception',
            error: e instanceof Error ? e.message : 'unknown',
        });
        return res.json({ user: null });
    }
});

const redirectRoutes = [
    '/login',
    '/google/callback',
];

redirectRoutes.forEach((path) => {
    app.get(`${config.route.prefix}${path}`, (req, res) => {
        res.redirect(`${process.env.OAUTH_HOST}/auth${path}`);
    });
});

app.get(`${config.route.prefix}/google`, (req, res) => {
    authBridgeLog('request', req, {
        action: 'google',
        outcome: 'google-redirect'
    });
    const qs = new URLSearchParams(req.query as any).toString();

    res.redirect(
        `${process.env.OAUTH_HOST}/google/auth${qs ? `?${qs}` : ''}`
    );
});

app.get(`${config.route.prefix}/auth-callback`, (req, res) => {
    const { token, returnTo } = req.query as {
        token?: string;
        returnTo?: string;
    };

    authBridgeLog('request', req, {
        action: 'oauth-callback',
        tokenPresent: Boolean(token),
    });

    if (!token) {
        authBridgeLog('verify', req, {
            action: 'oauth-callback',
            outcome: 'missing-token',
        });
        return res.status(400).send('Missing token');
    }

    setAuthCookie(res, token);

    authBridgeLog('verify', req, {
        action: 'oauth-callback',
        outcome: 'cookie-set',
    });

    res.redirect(returnTo || config.frontendUrl);
});

const passthroughRoutes = [
    '/logout',
];

passthroughRoutes.forEach((path) => {
    app.post(`${config.route.prefix}${path}`, async (req, res) => {
        clearAuthCookie(res)
        authBridgeLog('verify', req, {
            action: 'logout',
            outcome: 'cookie-cleared',
        });
        res.json({ message: 'You have been signed out.' });
    });
});

app.post(`${config.route.prefix}/login`, async (req, res) => {
    try {
        const oauthRes = await fetch(
            `${process.env.OAUTH_HOST}/local/auth`,
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(req.body),
            }
        )

        authBridgeLog('request', req, {
            action: 'login',
            oauthStatus: oauthRes.status,
        });

        const data = await oauthRes.json() as OAuthLoginResult;

        if (!oauthRes.ok || !data.token) {
            authBridgeLog('verify', req, {
                action: 'login',
                outcome: 'rejected',
                reason: !oauthRes.ok ? 'oauth_error' : 'no_token',
            });
            return res.status(401).json(data);
        }

        setAuthCookie(res, data.token);

        authBridgeLog('verify', req, {
            action: 'login',
            outcome: 'accepted',
            cookieSet: true,
        });

        return res.json({ ok: true });
    } catch (e) {
        authBridgeLog('verify', req, {
            action: 'login',
            outcome: 'error',
            error: e instanceof Error ? e.message : 'unknown',
        });
        res.status(500).end();
    }
});

app.listen(config.port, () => {
    console.log(`auth-bridge listening on ${config.port}`);
});