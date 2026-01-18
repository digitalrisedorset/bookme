
import { IncomingMessage } from "http";

export function getRequestIp(req?: IncomingMessage): string | undefined {
    if (!req) return;

    const cfIp = req.headers['cf-connecting-ip'];
    if (typeof cfIp === 'string') return cfIp;

    const xff = req.headers['x-forwarded-for'];
    if (typeof xff === 'string') {
        return xff.split(',')[0].trim();
    }

    return req.socket?.remoteAddress;
}

export function isPublicIp(ip?: string): boolean {
    if (!ip) return false;

    return !(
        ip === '::1' ||
        ip === '127.0.0.1' ||
        ip.startsWith('192.168.')
    );
}