import {useVenueConfigState} from "@/state/VenueConfigState";
import {getVenue} from "@/lib/config";

export const useConfig = () => {
    const {activeVenue} = useVenueConfigState()

    return getVenue(activeVenue)
}