import {createContext, useContext} from "react";
import {useImmer} from "use-immer";

interface EventInfoState {
    activeEventId: string,
    shampoo: boolean,
    haircutId: string
}

interface EventState {
    activeEventId: string,
    shampoo: boolean,
    haircutId: string,
    setActiveEvent: (id: string) => void
}

const intialState: EventInfoState = {
    activeEventId: '',
    shampoo: true,
    haircutId: ''
}

const LocalStateContext = createContext<EventState>({});
const LocalStateProvider = LocalStateContext.Provider;

function EventStateProvider({ children }) {
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

    const setHaircutPreference = (id: string) => {
        setState(draft => { draft.haircutId = id });
    }

    return <LocalStateProvider value={{ resetActiveEvent, toggleActiveEvent, toggleShampooEvent,  setHaircutPreference, eventState: state}}>{children}</LocalStateProvider>
}

function useEventState(): EventState {
    const all = useContext(LocalStateContext)
    return all
}

export { EventStateProvider, useEventState }