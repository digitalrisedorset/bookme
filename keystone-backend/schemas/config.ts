import {keystoneconfig} from '../config'
import {DatabaseProvider} from "@keystone-6/core/types";

export const getDatabaseType = (): DatabaseProvider => {
    const {database} = keystoneconfig

    return database.dbtype
}

export const getDatabaseConnection = () => {
    const {database} = keystoneconfig

    const dbPrefix = (database.dbtype==='mysql')?'mysql':'postgres'

    //return `postgresql://neondb_owner:npg_5yNXgUa9mveD@ep-red-dew-a27xyzxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`
    return `${dbPrefix}://${database.user}:${database.password}@${database.host}:${database.port}/${database.name}`
}

export const getShadowDatabaseConnection = () => {
    const {database} = keystoneconfig

    const dbPrefix = (database.dbtype==='mysql')?'mysql':'postgres'

    //return `postgresql://neondb_owner:npg_5yNXgUa9mveD@ep-red-dew-a27xyzxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`
    return `${dbPrefix}://${database.user}:${database.password}@${database.host}:${database.port}/shadowdb`
}
