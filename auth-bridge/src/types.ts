export type AuthEvent = {
    service: 'oauth' | 'auth-bridge';
    phase: 'request' | 'issue' | 'verify' | 'transport';
    trace: string;
    method?: string;
    path?: string;
    data?: Record<string, unknown>;
};