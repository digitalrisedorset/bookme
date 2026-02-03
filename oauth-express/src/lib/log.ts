import {OAuthOutcome, OAuthPhase} from "../types/logs";
import { config } from '../config';

export function oauthLog(
    phase: OAuthPhase,
    req: { headers?: Record<string, any> } | null,
    data: {
        outcome?: OAuthOutcome;
        [key: string]: unknown;
    }
) {
    if (!config.debug.enabled) return;

    const trace = null;
    //const trace = (req as any).authTraceId ?? 'none';

    //if (config.debug.traceFilter && trace !== config.debug.traceFilter) {
    //    return;
    //}

    console.log(
        '[AUTH][OAUTH]',
        phase.toUpperCase(),
        JSON.stringify({
            service: 'oauth',
            phase,
            trace,
            ...data,
        })
    );
}