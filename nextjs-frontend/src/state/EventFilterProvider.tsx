import {createContext, useContext} from 'react';
import {useImmer} from "use-immer";

interface DayFilterState {
    activeHaircutType: string,
    activeHairdresser: string,
    activeDay: string,
    activeWeek: string
}

interface FilterState {
    setActiveDay: (activeDay: string) => void,
    setActiveHaircutType: (activeHaircutType: string) => void,
    setActiveHairdresser: (activeHairdresser: string) => void,
    setActiveWeek: (activeWeek: string) => void,
    eventFilter: DayFilterState
}

const LocalStateContext = createContext<DayFilterState>({});
const LocalStateProvider = LocalStateContext.Provider;

const initialState: DayFilterState = {
    activeDay: '',
    activeHairdresser: '',
    activeHaircutType: '',
    activeWeek: ''
}

function EventFilterProvider({ children }) {
    const [state, setState] = useImmer<DayFilterState>(initialState);

    const setActiveDay = (activeDay: string) => {
        setState(draft => { draft.activeDay = activeDay });
    }

    const setActiveWeek = (activeWeek: string) => {
        setState(draft => { draft.activeWeek = activeWeek });
    }

    const setActiveHaircutType = (activeHaircutType: string) => {
        setState(draft => { draft.activeHaircutType = activeHaircutType });
    }

    const setActiveHairdresser = (activeHairdresser: string) => {
        setState(draft => { draft.activeHairdresser = activeHairdresser });
    }

    const resetFilter = () => {
        setState(draft => {
            draft.activeHairdresser = '',
            draft.activeWeek = ''
        });
    }

    return (
        <LocalStateProvider
            value={{
                resetFilter,
                setActiveDay,
                setActiveHaircutType,
                setActiveHairdresser,
                setActiveWeek,
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
    return all as FilterState;
}

export { EventFilterProvider, useEventFilterState };