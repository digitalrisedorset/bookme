import dotenv from 'dotenv';
dotenv.config();
import path from "path";

export function loadEnv() {
    const env = process.env.APP_ENV ?? 'local';
    const envFile = path.resolve(process.cwd(), 'env', `${env}.env`);
    const result = dotenv.config({ path: envFile });

    if (result.error) {
        throw new Error(`Failed to load env file: ${envFile}`);
    }
}


export function isProduction() {
    return process.env.APP_ENV === 'live'
}
