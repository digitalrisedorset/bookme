import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export type UserPreference = 'HaircutGroup' | 'HaircutType' | 'Week' | (string & {})

export const getUserPreferenceStep = (user: UserInformation): UserPreference => {
    if (!user?.haircutTypeGroup) {
        return 'HaircutGroup'
    }

    if (!user?.haircutType) {
        return 'HaircutType'
    }

    return 'Week'
}