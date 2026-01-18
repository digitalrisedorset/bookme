import {isPublicIp} from "./request";

export async function verifyTurnstileToken(
    token: string,
    remoteIp?: string
): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        throw new Error("TURNSTILE_SECRET_KEY is not configured");
    }

    console.log('verifyTurnstileToken', {
        token: token,
        remoteip: isPublicIp(remoteIp) ? remoteIp : null
    })

    const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                secret,
                response: token,
                remoteip: isPublicIp(remoteIp) ? remoteIp : null
            }),
        }
    );

    console.log('verifyTurnstileToken response', response)

    if (!response.ok) {
        return false;
    }

    const result = await response.json();

    return result.success === true;
}
