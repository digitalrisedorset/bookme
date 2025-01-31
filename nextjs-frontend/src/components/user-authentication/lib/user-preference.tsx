import {EventPreferenceFilterType, PREFERENCE_RESET} from "@/components/event/types/event";
import {graphQLVariables} from "@/components/user-authentication/types/user";

export const getUserPreferenceVariables = (userId: string, fields: EventPreferenceFilterType) => {
    const data: graphQLVariables = {}

    for (const index in fields) {
        if (!fields.hasOwnProperty(index)) continue;
        const value = fields[index as keyof EventPreferenceFilterType];
        if (value === undefined) continue

        if (index === 'weekPreference') {
            data[index] = value
        }

        switch (index) {
            case 'haircutType':
            case 'haircutTypeGroup':
            case 'hairdresser':
                if (fields[index] === PREFERENCE_RESET) {
                    data[index] = {"disconnect": true}
                } else {
                    data[index] = {
                        "connect": {
                            "id": value
                        }
                    }
                }
                break;
        }
    }

    return {
        "data": data,
        "where": {
            "id": userId
        },
    }
}