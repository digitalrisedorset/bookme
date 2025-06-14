import {DatabaseProvider} from "@keystone-6/core/types";

const dotenv = require('dotenv');
dotenv.config();

export type configInfo = {
    frontend: {
        host: string,
        port: number
    },
    backend: {
        host: string,
        port: number
    },
    database: {
        dbtype: DatabaseProvider,
        name: string,
        host: string,
        user: string,
        password: string,
        port: number
    },
    session: {
        cookieSecret: string
    },
    stripe: {
        secretKey: string
    },
    aws: {
       accessId: string,
       secretAccess: string,
       region: string
    },
    hairdressing: {
        companyCode: string,
        offerShampoo: boolean,
        scheduleWeekSpan: number
    }
}

const config: configInfo = {
    frontend: {
        host: (process.env.FRONTEND_HOST === undefined)?'localhost':process.env.FRONTEND_HOST,
        port: (process.env.FRONTEND_PORT === undefined)?3001:Number(process.env.FRONTEND_PORT)
    },
    backend: {
        host: (process.env.BACKEND_HOST === undefined)?'localhost':process.env.BACKEND_HOST,
        port: (process.env.BACKEND_PORT === undefined)?3002:Number(process.env.BACKEND_PORT)
    },
    database: {
        dbtype: (process.env.DB_TYPE === undefined)?'postgresql':process.env.DB_TYPE as DatabaseProvider,
        name: (process.env.DB_DATABASE === undefined)?'template1':process.env.DB_DATABASE,
        host: (process.env.DB_HOST === undefined)?'localhost':process.env.DB_HOST,
        user: (process.env.DB_USER === undefined)?'postgres':process.env.DB_USER,
        password: (process.env.DB_PWD === undefined)?'passw0rd':process.env.DB_PWD,
        port: (process.env.DB_PORT === undefined)?3306:Number(process.env.DB_PORT)
    },
    session: {
        cookieSecret: (process.env.COOKIE_SECRET === undefined)?'this is a very long secret that has 32 characters':process.env.COOKIE_SECRET
    },
    stripe: {
        secretKey: (process.env.STRIPE_SECRET  === undefined)? 'sk_test_51PITSKRqZ4IliSNkAocVG9f9K8cCecrEEqJfdmFg3wzgjYN4F5JgidjcNo8JAZXpyLA0s3yRswWBen4l6anyKgzi008oZfNt8K':process.env.STRIPE_SECRET
    },
    aws: {
        accessId: process.env.AWS_ACCESS_KEY_ID,
        secretAccess: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    },
    hairdressing: {
        companyCode: 'maddison',
        offerShampoo: true,
        scheduleWeekSpan: 14
    }
}

export { config as keystoneconfig}