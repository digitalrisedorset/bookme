import {createContext, useContext} from 'react';
import {useImmer} from "use-immer";

const LocalStateContext = createContext<any>({});
const LocalStateProvider = LocalStateContext.Provider;

interface DayFilterState {
    activeEventType: string,
    activeVenue: string,
    activeDay: string,
}

const initialState: DayFilterState = {
    activeDay: '',
    activeVenue: '',
    activeEventType: ''
}

function EventFilterProvider({ children }) {
    const [state, setState] = useImmer<DayFilterState>(initialState);

    const setActiveDay = (activeDay: string) => {
        setState(draft => { draft.activeDay = activeDay });
    }

    const setActiveEventType = (activeEventType: string) => {
        setState(draft => { draft.activeEventType = activeEventType });
    }

    const setActiveVenue = (activeVenue: string) => {
        setState(draft => { draft.activeVenue = activeVenue });
    }

    return (
        <LocalStateProvider
            value={{
                setActiveDay,
                setActiveEventType,
                setActiveVenue,
                eventFilter: state
            }}
        >
            {children}
        </LocalStateProvider>
    )
}


function useEventFilterState() {
    // We use a consumer here to access the local state
    const all = useContext(LocalStateContext);
    return all;
}

export { EventFilterProvider, useEventFilterState };