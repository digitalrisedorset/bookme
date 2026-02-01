import dotenv from 'dotenv';
dotenv.config();

export type configInfo = {
    port: number;
    frontendUrl: string;
    route: {
        prefix: string;
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 3002: Number(process.env.PORT),
    frontendUrl: (process.env.FRONTEND_HOST === undefined)?'http://localhost:5173':process.env.FRONTEND_HOST,
        /**
     * Routes access
     */
    route: {
        prefix: '/auth'
    },
}



