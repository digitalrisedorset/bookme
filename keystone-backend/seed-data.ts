import { EventCreator } from './seed-data/events'

export async function insertSeedData(context, companyCode: string) {
    console.log(`🌱 Inserting seed data`)

    const eventCreator = new EventCreator(context)
    //eventCreator.deleteAllEvents()
    //eventCreator.createAllEvents()

    console.log(`✅ Seed data inserted`)
}
