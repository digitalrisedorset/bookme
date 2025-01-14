import {config} from "@/config";

export const venueConfig = () => {
    //const enumKeys = Object.keys(config.venuePreference).filter(k => isNaN(Number(k)))
    const enumValues = Object.values(config.venuePreference).filter((o) => o.active === true);

    return enumValues[0]
}