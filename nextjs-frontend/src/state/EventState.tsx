import {createContext, useContext, useState} from "react";

interface EventState {
    eventActive: string,
    shampoo: boolean,
    haircut: string,
    setActiveEvent: (id: string) => void
}

const LocalStateContext = createContext<EventState>({});
const LocalStateProvider = LocalStateContext.Provider;

function EventStateProvider({ children }) {
    const [activeEvent, setActiveEvent] = useState('')
    const [haircut, setHaircut] = useState('')
    const [shampoo, setShampoo] = useState(true)

    const toggleActiveEvent = (id: string) => {
        setActiveEvent(id)
    }

    const toggleShampooEvent = () => {
        setShampoo(!shampoo)
    }

    const setHaircutEvent = (name: string) => {
        setHaircut(name)
    }

    return <LocalStateProvider value={{ activeEvent, haircut, shampoo, toggleActiveEvent, toggleShampooEvent,  setHaircutEvent }}>{children}</LocalStateProvider>
}

function useEventState(): EventState {
    const all = useContext(LocalStateContext)
    return all
}

export { EventStateProvider, useEventState }