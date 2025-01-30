import {createContext, ReactNode, useContext} from "react";
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

    if (venue === null || venue === undefined) {
        venue = config.venuePreference.defaultVenue
    }

    return venue
}

const intialState: VenueConfigInfoState = {
    activeVenue: readActiveVenue()
}

const LocalStateContext = createContext<VenueConfigState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface VenueConfigStateProviderProps {
    children: ReactNode;
}

const VenueConfigStateProvider: React.FC<VenueConfigStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<VenueConfigInfoState>(intialState);

    const setActiveVenue = (code: string) => {
        setState(draft => { draft.activeVenue = code });
    }

    return <LocalStateProvider
        value={{
            setActiveVenue,
            activeVenue: state.activeVenue
        }}>{children}</LocalStateProvider>
}

function useVenueConfigState(): VenueConfigState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("useVenueConfigState must be used within a LocalStateProvider");
    }
    return context;
}

export { VenueConfigStateProvider, useVenueConfigState }