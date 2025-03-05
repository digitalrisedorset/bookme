import {createContext, ReactNode, useCallback, useContext, useEffect, useRef} from "react";
import {useImmer} from "use-immer";

interface EventInfoState {
    activeEventId: string | undefined,
    shampoo: boolean,
}

interface EventState {
    eventState: EventInfoState,
    resetActiveEvent: () => void
    toggleActiveEvent: (id: string) => void
    toggleShampooEvent: () => void
}

const intialState: EventInfoState = {
    activeEventId: '',
    shampoo: false,
}

const LocalStateContext = createContext<EventState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface EventStateProviderProps {
    children: ReactNode;
    eventGroup?: { eventHosts: { eventId: string }[] };
}

const EventStateProvider: React.FC<EventStateProviderProps> = ({ children, eventGroup }) => {
    const [state, setState] = useImmer<EventInfoState>(intialState);
    const initialised = useRef(false)

    const toggleActiveEvent = useCallback((id: string) => {
        setState(draft => { draft.activeEventId = id });
    }, [setState]);

    const resetActiveEvent = useCallback(() => {
        setState(draft => { draft.activeEventId = undefined });
    },[setState]);

    const toggleShampooEvent = useCallback(() => {
        setState(draft => { draft.shampoo = !draft.shampoo });
    },[setState]);

    // 🔥 Initialize activeEventId if only one eventHost exists
    useEffect(() => {
        if (initialised.current) return;

        if (eventGroup?.eventHosts?.length === 1 && !state.activeEventId) {
            setState(draft => {
                draft.activeEventId = eventGroup.eventHosts[0].eventId;
            });
            initialised.current = true
        }
    }, [eventGroup?.eventHosts, setState, state.activeEventId]); // Dependencies ensure it runs only when needed

    return <LocalStateProvider
        value={{
            resetActiveEvent,
            toggleActiveEvent,
            toggleShampooEvent,
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