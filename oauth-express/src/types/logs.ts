export type OAuthPhase = 'request' | 'issue' | 'verify' | 'strategy';
export type OAuthOutcome = 'issued' | 'rejected' | 'active-session' | 'no-session' | 'error' | 'not-found';