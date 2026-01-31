import express, {Application, NextFunction, Request, Response} from "express";
import { config } from "./config";
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import cookieParser from 'cookie-parser';

type OAuthLoginResult = { token: string; user?: unknown }

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(
        '[BRIDGE]',
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

app.post(`${config.route.prefix}/refresh-session`, async (req: Request, res: Response) => {
    const token = req.cookies?.token; // or header / storage

    try {
        const oauthRes = await fetch(
            `${process.env.OAUTH_HOST}/auth/refresh-session`,
            {
                method: "POST",
                headers: token
                    ? { Authorization: `Bearer ${token}` }
                    : {},
            }
        );

        if (oauthRes.status === 401 || oauthRes.status === 204) {
            return res.json({ user: null });
        }

        if (!oauthRes.ok) {
            return res.json({ user: null });
        }

        const json = await oauthRes.json();
        return res.json(json);
    } catch {
        return res.json({ user: null });
    }
});

const redirectRoutes = [
    '/login',
    '/google',
    '/google/callback',
];

redirectRoutes.forEach((path) => {
    app.get(`${config.route.prefix}${path}`, (req, res) => {
        res.redirect(`${process.env.OAUTH_HOST}/auth${path}`);
    });
});

const passthroughRoutes = [
    '/logout',
];

passthroughRoutes.forEach((path) => {
    app.post(`${config.route.prefix}${path}`, async (req, res) => {
        try {
            const oauthRes = await fetch(
                `${process.env.OAUTH_HOST}/auth${path}`,
                {
                    method: 'POST',
                    headers: {
                        cookie: req.headers.cookie ?? '',
                        'content-type': req.headers['content-type'] ?? '',
                    },
                    body: req,
                }
            );

            res.status(oauthRes.status);
            if (oauthRes.body) {
                await pipeline(
                    Readable.fromWeb(oauthRes.body as any),
                    res as unknown as NodeJS.WritableStream
                );
            } else {
                res.end();
            }
        } catch {
            res.status(500).end();
        }
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

        const data = await oauthRes.json() as OAuthLoginResult;

        if (!oauthRes.ok || !data.token) {
            return res.status(401).json(data);
        }

        res.cookie('token', data.token, {
            httpOnly: true,
            sameSite: 'lax',
        });

        return res.json({ ok: true });
    } catch (err) {
        console.error('[BRIDGE LOGIN ERROR]', err);
        res.status(500).end();
    }
});

app.listen(config.port, () => {
    console.log(`auth-bridge listening on ${config.port}`);
});