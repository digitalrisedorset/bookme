import {UserPreferenceInfoState} from "@/state/UserPreference";

export type UserPreference = 'EventTypeGroup' | 'EventType' | 'Week' | (string & {})

export const getUserPreferenceStep = (userPreference: UserPreferenceInfoState): UserPreference => {
    if (userPreference?.eventTypeGroupId === '') {
        return 'EventTypeGroup'
    }

    if (userPreference?.eventTypeId === '') {
        return 'EventType'
    }

    return 'Week'
}