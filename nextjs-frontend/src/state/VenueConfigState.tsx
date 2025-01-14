import {createContext, useContext} from "react";
import {useImmer} from "use-immer";
import {VenuePreference} from "@/config";
import {venueConfig} from "@/lib/config";

interface VenueConfigInfoState {
    preference: VenuePreference,
}

interface VenueConfigState {
    config: VenuePreference,
    setActiveVenue: (config: VenuePreference) => void
}

const intialState: VenueConfigInfoState = {
    preference: venueConfig()
}

const LocalStateContext = createContext<VenueConfigState>({});
const LocalStateProvider = LocalStateContext.Provider;

function VenueConfigStateProvider({ children }) {
    const [state, setState] = useImmer<VenueConfigInfoState>(intialState);

    const setActiveVenue = (config: VenuePreference) => {
        setState(draft => { draft.preference = config });
    }

    return <LocalStateProvider value={{ setActiveVenue, config: state.preference}}>{children}</LocalStateProvider>
}

function useVenueConfigState(): VenueConfigState {
    const all = useContext(LocalStateContext)
    return all
}

export { VenueConfigStateProvider, useVenueConfigState }