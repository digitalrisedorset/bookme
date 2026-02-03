import rateLimit, {ipKeyGenerator} from 'express-rate-limit';
import {keystoneconfig} from './config'

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: (req) => {
        if (req.headers.authorization) {
            console.log("🛡️ Higher rate limit for authenticated user");
            return keystoneconfig.ratelimit * 10; // ✅ Allow 10 times more requests for authenticated users
        }
        return keystoneconfig.ratelimit; // ✅ Normal limit for unauthenticated users
    },
    message: "❌ Too many requests, please try again later.",
    keyGenerator: (req, res) => ipKeyGenerator(req, res),
});
