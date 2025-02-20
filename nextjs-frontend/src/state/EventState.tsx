import {createContext, ReactNode, useContext} from "react";
import {useImmer} from "use-immer";

interface EventInfoState {
    activeEventId: string | undefined,
    shampoo: boolean,
    eventTypeId: string
}

interface EventState {
    eventState: EventInfoState,
    resetActiveEvent: () => void
    toggleActiveEvent: (id: string) => void
    toggleShampooEvent: () => void
    setEventTypePreference: (id: string) => void
}

const intialState: EventInfoState = {
    activeEventId: '',
    shampoo: false,
    eventTypeId: ''
}

const LocalStateContext = createContext<EventState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface EventStateProviderProps {
    children: ReactNode;
}

const EventStateProvider: React.FC<EventStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<EventInfoState>(intialState);

    const toggleActiveEvent = (id: string) => {
        setState(draft => { draft.activeEventId = id });
    }

    const resetActiveEvent = () => {
        setState(draft => { draft.activeEventId = undefined });
    }

    const toggleShampooEvent = () => {
        setState(draft => { draft.shampoo = !draft.shampoo });
    }

    const setEventTypePreference = (id: string) => {
        setState(draft => { draft.eventTypeId = id });
    }

    return <LocalStateProvider
        value={{
            resetActiveEvent,
            toggleActiveEvent,
            toggleShampooEvent,
            setEventTypePreference,
            eventState: state
        }}
    >{children}</LocalStateProvider>
}

function useEventState(): EventState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("useEventState must be used within a LocalStateProvider");
    }
    return context;
}

export { EventStateProvider, useEventState }