import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export type UserPreference = 'EventTypeGroup' | 'EventType' | 'Week' | (string & {})

export const getUserPreferenceStep = (user: UserInformation): UserPreference => {
    if (user?.eventTypeGroup === null) {
        return 'EventTypeGroup'
    }

    if (user?.eventType === null) {
        return 'EventType'
    }

    return 'Week'
}