import { config } from '@keystone-6/core'
import type { TypeInfo } from '.keystone/types'
import { withAuth } from "./auth";
import { statelessSessions } from '@keystone-6/core/session';
import {type Session, lists, extendGraphqlSchema} from './schema'
import {getDatabaseConnection, getDatabaseType} from './schemas/config'
import {keystoneconfig} from './config'
import {insertSeedData} from './seed-data'

const sessionConfig = {
    maxAge: 60 * 60, // How long they stay signed in?
    secret: keystoneconfig.session.cookieSecret,
};

console.log(`Keystone frontend: ${keystoneconfig.frontend.host}`)
console.log(`database ${getDatabaseConnection()}`)

export default withAuth<TypeInfo<Session>>(
    config<TypeInfo>({
        server: {
            cors: { origin: [keystoneconfig.frontend.host], credentials: true },
            port: 3000,
            maxFileSize: 200 * 1024 * 1024,
            extendExpressApp: async (app, commonContext) => { /* ... */ },
            extendHttpServer: async (httpServer, commonContext) => { /* ... */ },
        },
        db: {
            provider: getDatabaseType(),
            url: getDatabaseConnection(),
            onConnect: async context => {
                console.log('Connected to the database')
                //await insertSeedData(context)
            },
            //Optional advanced configuration
            //enableLogging: true,
            idField: { kind: 'uuid' }
        },
        lists,
        graphql: {
            extendGraphqlSchema
        },
        ui: {
            //isAccessAllowed: ()=> true,
            // only admins can view the AdminUI
            isAccessAllowed: (context) => {
                return context.session?.data?.isAdmin ?? false
            },
        },
        // you can find out more at https://keystonejs.com/docs/apis/session#session-api
        session: statelessSessions(sessionConfig)
    })
)