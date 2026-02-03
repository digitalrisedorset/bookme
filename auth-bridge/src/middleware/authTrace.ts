// auth-bridge/middleware/authTrace.ts
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function authTrace(req: Request, res: Response, next: NextFunction) {
    const authTraceId =
        (req.headers['x-auth-trace'] as string | undefined) ?? randomUUID();

    res.set('x-auth-trace', authTraceId);

    // optionally expose for downstream handlers
    (req as any).authTraceId = authTraceId;

    next();
}