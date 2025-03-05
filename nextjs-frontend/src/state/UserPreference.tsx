import {createContext, ReactNode, useContext} from "react";
import {useImmer} from "use-immer";

export interface UserPreferenceInfoState {
    weekPreference: string,
    eventTypeId: string,
    eventTypeGroupId: string
}

interface UserPreferenceState {
    userPreference: UserPreferenceInfoState,
    setWeekPreference: (value: string) => void,
    setEventType: (value: string) => void,
    setEventTypeGroup: (value: string) => void,
    resetPreference: () => void
}

const readUserPreferencee = (): UserPreferenceInfoState => {
    let weekPreference = ''
    if (typeof localStorage !== 'undefined') {
        weekPreference = localStorage.getItem('weekPreference')
    }

    let eventTypeId = ''
    if (typeof localStorage !== 'undefined') {
        eventTypeId = localStorage.getItem('eventType')
    }

    let eventTypeGroupId = ''
    if (typeof localStorage !== 'undefined') {
        eventTypeGroupId = localStorage.getItem('eventTypeGroup')
    }

    return {
        weekPreference,
        eventTypeId: eventTypeId,
        eventTypeGroupId: eventTypeGroupId
    }
}

const intialState = {
    userPreference: readUserPreferencee()
}

const LocalStateContext = createContext<UserPreferenceState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface UserPreferenceStateProviderProps {
    children: ReactNode;
}

const UserPreferenceStateProvider: React.FC<UserPreferenceStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<UserPreferenceInfoState>(intialState);

    const updateLocalStorage = (keystate:keyof UserPreferenceInfoState, value: string) => {
        setState(draft => { draft.userPreference[keystate] = value});
        localStorage.setItem('userPreference', JSON.stringify({...state.userPreference, [keystate]: value}))
    }

    const setWeekPreference = (value: string) => {
        updateLocalStorage('weekPreference', value)
    }

    const setEventType = (value: string) => {
        updateLocalStorage('eventTypeId', value)
    }

    const setEventTypeGroup = (value: string) => {
        updateLocalStorage('eventTypeGroupId', value)
    }

    const resetPreference = () => {
        setState(null)
        localStorage.removeItem('userPreference')
    }

    return <LocalStateProvider
        value={{
            setWeekPreference,
            setEventType,
            setEventTypeGroup,
            resetPreference,
            userPreference: state.userPreference
        }}>{children}</LocalStateProvider>
}

function useUserPreferenceState(): UserPreferenceState {
    const context = useContext(LocalStateContext)
    if (!context) {
        throw new Error("useUserPreferenceState must be used within a LocalStateProvider");
    }
    return context;
}

export { UserPreferenceStateProvider, useUserPreferenceState }