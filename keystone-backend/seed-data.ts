import {EventCreator} from './seed-data/events'

export async function insertSeedData (context) {
    console.log(`🌱 Inserting seed data`)

    const eventCreator = new EventCreator(context)
    eventCreator.createAllEvents()

    console.log(`✅ Seed data inserted`)
}
