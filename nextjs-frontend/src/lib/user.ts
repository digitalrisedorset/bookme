import {UserPreferenceInfoState} from "@/state/UserPreference";

export type UserPreference = 'EventTypeGroup' | 'EventType' | 'Week' | (string & {})

export const getUserPreferenceStep = (userPreference: UserPreferenceInfoState): UserPreference => {
    if (userPreference?.eventTypeGroupId === null) {
        return 'EventTypeGroup'
    }

    if (userPreference?.eventTypeId === null) {
        return 'EventType'
    }

    return 'Week'
}