import {AuthEvent} from "../types";
import {Request} from "express";
import { config } from '../config';

export function logRefreshSession(
    req: Request,
    outcome: 'active' | 'no-session' | 'oauth-error' | 'exception',
    extra?: Record<string, unknown>
) {
    authBridgeLog('verify', req, {
        action: 'refresh-session',
        outcome,
        ...extra,
    });
}

export function authBridgeLog(
    phase: AuthEvent['phase'],
    req: Request,
    data?: Record<string, unknown>
) {
    if (!config.debug.enabled) return;

    const trace = (req as any).authTraceId ?? 'none';

    if (config.debug.traceFilter && trace !== config.debug.traceFilter) {
        return;
    }

    console.log(
        '[AUTH][BRIDGE]',
        phase.toUpperCase(),
        JSON.stringify({
            service: 'auth-bridge',
            phase,
            trace: (req as any).authTraceId ?? 'none',
            method: req.method,
            path: req.originalUrl,
            data,
        })
    );
}