import {config, VenuePreference} from "@/config";

export const getVenue = (code: string): VenuePreference => {
    if (code === '') code = 'blush-harry'

    const enumValues = Object.values(config.venuePreference).filter((o) => o.code === code);

    return enumValues[0]
}