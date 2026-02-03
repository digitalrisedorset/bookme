import { Response } from 'express';
import {config} from "../config";

export function setAuthCookie(
    res: Response,
    token: string
) {
    res.cookie('token', token, config.auth.cookie);
}

export function clearAuthCookie(
    res: Response
) {
    res.clearCookie('token', {
        domain: config.auth.cookie.domain,
        path: '/',
    });
}