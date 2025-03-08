import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { EventTypeGroup } from "@/components/event/types/event";

export interface UserPreferenceInfoState {
    weekPreference: string;
    eventTypeId: string;
    eventTypeGroupId: string;
}

interface UserPreferenceState {
    userPreference: UserPreferenceInfoState;
    setWeekPreference: (value: string) => void;
    setEventType: (value: string) => void;
    setEventTypeGroup: (value: string) => void;
    resetPreference: () => void;
}

const readUserPreference = (): UserPreferenceInfoState => {
    if (typeof window === "undefined") {
        return { weekPreference: "", eventTypeId: "", eventTypeGroupId: "" };
    }

    try {
        const storedData = JSON.parse(localStorage.getItem("userPreference") || "{}");
        return {
            weekPreference: storedData.weekPreference || "",
            eventTypeId: storedData.eventTypeId || "",
            eventTypeGroupId: storedData.eventTypeGroupId || "",
        };
    } catch (error) {
        console.log(error)
        return { weekPreference: "", eventTypeId: "", eventTypeGroupId: "" };
    }
};

const LocalStateContext = createContext<UserPreferenceState | undefined>(undefined);
const LocalStateProvider = LocalStateContext.Provider;

interface UserPreferenceStateProviderProps {
    children: ReactNode;
    eventTypeGroups: EventTypeGroup[];
}

const UserPreferenceStateProvider: React.FC<UserPreferenceStateProviderProps> = ({ children, eventTypeGroups }) => {
    const [state, setState] = useImmer<{ userPreference: UserPreferenceInfoState }>({
        userPreference: readUserPreference(),
    });

    const initialized = useRef(false);

    // ✅ Keep state in sync with `localStorage` (Fixes Next.js navigation reset issue)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("userPreference", JSON.stringify(state.userPreference));
        }
    }, [state.userPreference]);

    const updatePreference = useCallback((keyState: keyof UserPreferenceInfoState, value: string) => {
        setState(draft => {
            draft.userPreference[keyState] = value;
        });
    }, [setState]);

    const setWeekPreference = useCallback((value: string) => {
        updatePreference("weekPreference", value);
    }, [updatePreference]);

    const setEventType = useCallback((value: string) => {
        updatePreference("eventTypeId", value);
    }, [updatePreference]);

    const setEventTypeGroup = useCallback((value: string) => {
        updatePreference("eventTypeGroupId", value);
    }, [updatePreference]);

    const resetPreference = useCallback(() => {
        setState({ userPreference: { weekPreference: "", eventTypeId: "", eventTypeGroupId: "" } });
        if (typeof window !== "undefined") {
            localStorage.removeItem("userPreference");
        }
    }, [setState]);

    // ✅ Ensure `eventTypeGroups` is loaded before setting `eventTypeGroupId` (Fix for undefined state issue)
    useEffect(() => {
        if (initialized.current || !eventTypeGroups || eventTypeGroups.length === 0) return;

        console.log("groups useEffect", eventTypeGroups);

        setEventTypeGroup(eventTypeGroups[0].id);

        initialized.current = true;
    }, [eventTypeGroups, setEventTypeGroup]);

    return (
        <LocalStateProvider
            value={{
                setWeekPreference,
                setEventType,
                setEventTypeGroup,
                resetPreference,
                userPreference: state.userPreference,
            }}
        >
            {children}
        </LocalStateProvider>
    );
};

function useUserPreferenceState(): UserPreferenceState {
    const context = useContext(LocalStateContext);
    if (!context) {
        throw new Error("useUserPreferenceState must be used within a LocalStateProvider");
    }
    return context;
}

export { UserPreferenceStateProvider, useUserPreferenceState };
