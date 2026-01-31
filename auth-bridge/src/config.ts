import dotenv from 'dotenv';
dotenv.config();

export type configInfo = {
    port: number;
    route: {
        prefix: string;
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 3002: Number(process.env.PORT),
        /**
     * Routes access
     */
    route: {
        prefix: '/auth'
    },
}



