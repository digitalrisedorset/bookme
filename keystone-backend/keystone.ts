import { config } from '@keystone-6/core'
import type { TypeInfo } from '.keystone/types'
import {extendGraphqlSchema, lists} from './schema'
import {getDatabaseConnection, getDatabaseType} from './schemas/config'
import {keystoneconfig} from './config'
import {insertSeedData} from './seed-data'
import { withAuth, session } from './auth'
import {limiter} from "./rate-limiter";

console.log(`Keystone frontend: ${keystoneconfig.frontend.host}, backend: ${keystoneconfig.backend.host}`)
console.log(`rate limit ${keystoneconfig.ratelimit}`)
console.log(`database ${getDatabaseConnection()}`)

export default withAuth<TypeInfo>(
    config<TypeInfo>({
        server: {
            cors: { origin: [keystoneconfig.frontend.host, keystoneconfig.backend.host], credentials: true },
            port: 3000,
            maxFileSize: 200 * 1024 * 1024,
            extendExpressApp: (app) => {
                app.use("/api/graphql", limiter); // Apply rate limiter to API*/

                // Reset Rate Limits (For Testing)
                app.get("/reset-rate-limit", (req, res) => {
                    limiter.resetKey(req.ip); // ✅ Reset limit for current IP
                    res.send("✅ Rate limit reset for your IP!");
                });

                app.use((req, res, next) => {
                    const allowedIPs = [process.env.ALLOWED_IPS]; // ✅ Replace with your actual IPs
                    const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

                    if (!allowedIPs.includes(clientIP)) {
                        return res.status(403).send("Access Denied: Unauthorized IP Address");
                    }

                    console.log(`🔍 API Request: ${req.method} ${req.path}`);
                    next();
                });
            },
            extendHttpServer: async (httpServer, commonContext) => { /* ... */ },
        },
        db: {
            provider: getDatabaseType(),
            url: getDatabaseConnection(),
            onConnect: async context => {
                console.log('Connected to the database')
                await insertSeedData(context)
            },
            //Optional advanced configuration
            //enableLogging: true,
            idField: { kind: 'uuid' }
        },
        lists,
        graphql: {
            playground: process.env.NODE_ENV !== "production", // ❌ Disable Playground in production
            introspection: process.env.NODE_ENV !== "production", // ❌ Prevent schema exposure
            extendGraphqlSchema
        },
        ui: {
            //isAccessAllowed: ()=> true,
            // only admins can view the AdminUI
            //isAccessAllowed: (context) => {
                //return context.session?.data?.isAdmin ?? false
            //},
             isAccessAllowed: ({ req }) => {
                return req.headers.authorization === `Bearer ${process.env.KEYSTONE_SERVICE_TOKEN}`;
             }
        },
        // you can find out more at https://keystonejs.com/docs/apis/session#session-api
        session,
    })
)