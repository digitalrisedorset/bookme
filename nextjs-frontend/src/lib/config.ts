import {config, VenuePreference} from "@/config";
import {DEFAULT_VENUE} from "@/components/venue/types/venue";

export const getVenue = (code: string): VenuePreference => {
    function isVenuePreference<T extends object>(
        value: T | unknown
    ): value is VenuePreference {
        const keys: (keyof VenuePreference)[] = Object.keys(
            {} as VenuePreference
        ) as (keyof VenuePreference)[];
        return (
            typeof value === "object" &&
            value !== null &&
            keys.every((key) => key in value)
        );
    }

    if (code === '') code = DEFAULT_VENUE

    const enumValues = Object.values(config.venuePreference).filter((o): o is VenuePreference => isVenuePreference(o) && o.code === code);

    return enumValues[0]
}