import { EventCreator } from './seed-data/events'

export const IMPORT_VENUE = 1
export const IMPORT_VENUE_HOLIDAY = 2
export const IMPORT_VENUE_HAIRCUT_GROUP = 3
export const IMPORT_HAIRCUT_TYPE = 4
export const IMPORT_VENUE_HAIRDRESSER = 5 // to run twice
export const IMPORT_VENUE_HAIRDRESSER_HOLIDAY = 6
export const IMPORT_CUSTOMER = 7
const IMPORT_DELETE_EVENT = 8
const IMPORT_CREATE_EVENT = 9

export async function insertSeedData(context) {
    console.log(`🌱 Inserting seed data`)

    if (process.argv.includes('--seed-data-step')) {
        const step = parseInt(process.argv[4])
        console.log(`seed-data start for step ${step}`)
        const eventCreator = new EventCreator(context, step)

        if (step === IMPORT_DELETE_EVENT) {
            eventCreator.deleteAllEvents()
        }
        if (step === IMPORT_CREATE_EVENT) {
            eventCreator.createAllEvents()
        }
    }

    console.log(`✅ Seed data inserted`)
}
