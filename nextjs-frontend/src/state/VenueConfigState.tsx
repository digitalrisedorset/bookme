import {createContext, useContext} from "react";
import {useImmer} from "use-immer";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import {config} from "@/config"

interface VenueConfigInfoState {
    activeVenue: string,
}

interface VenueConfigState {
    activeVenue: string,
    setActiveVenue: (code: string) => void
}

const readActiveVenue = () => {
    let venue
    if (typeof localStorage !== 'undefined') {
        venue = localStorage.getItem(ACTIVE_VENUE_KEY)
    }

    if (venue === null) {
        venue = config.venuePreference.defaultVenue
    }

    return venue
}

const intialState: VenueConfigInfoState = {
    activeVenue: readActiveVenue()
}

const LocalStateContext = createContext<VenueConfigState>({});
const LocalStateProvider = LocalStateContext.Provider;

function VenueConfigStateProvider({ children }) {
    const [state, setState] = useImmer<VenueConfigInfoState>(intialState);

    const setActiveVenue = (code: string) => {
        setState(draft => { draft.activeVenue = code });
    }

    return <LocalStateProvider value={{ setActiveVenue, activeVenue: state.activeVenue}}>{children}</LocalStateProvider>
}

function useVenueConfigState(): VenueConfigState {
    const all = useContext(LocalStateContext)
    return all
}

export { VenueConfigStateProvider, useVenueConfigState }