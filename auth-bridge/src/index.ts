import express, {Application, NextFunction, Request, Response} from "express";
import { config } from "./config";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {authBridgeLog} from "./lib/log";
import {clearAuthCookie, setAuthCookie} from "./auth/cookiePolicy";

type OAuthLoginResult = { token: string; user?: unknown }

const app: Application = express();
app.set('trust proxy', true);
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
        const oauthRes = await fetch(
            `${config.oauthUrl}/auth/refresh-session`,
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

app.get(`${config.route.prefix}/login`, (_req, res) => {
    res.redirect(`${config.oauthUrl}/auth/login`);
});

/*
* First API call made by the frontend to initiate Google Authentication process
**/
app.get(`${config.route.prefix}/google`, (req, res) => {
    const qs = new URLSearchParams(req.query as any).toString();

    authBridgeLog('request', req, {
        action: 'google',
        outcome: 'google-redirect',
        queryString: qs
    });

    res.redirect(
        `${config.oauthUrl}/google/auth${qs ? `?${qs}` : ''}`
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
            `${config.oauthUrl}/local/auth`,
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

app.post(`${config.route.security}/verify-human`, async (req, res) => {
    const { token } = req.body;

    authBridgeLog('request', req, {
        action: 'security',
        token
    });

    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: config.security.cloudflare.siteKey,
                response: token
            }),
        }
    );

    const result = await response.json();

    authBridgeLog('request', req, {
        action: 'security',
        result
    });

    if (!result.success) {
        return res.status(403).json({ ok: false });
    }

    // ✅ Cloudflare confirmed this browser passed
    return res.json({ ok: true });
});

app.listen(config.port, () => {
    console.log('[BOOT] Loaded configuration:', JSON.stringify(config, null, 2));
});