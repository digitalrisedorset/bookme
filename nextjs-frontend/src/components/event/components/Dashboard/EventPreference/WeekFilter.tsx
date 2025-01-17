import {getWeeks} from "@/lib/date";
import {HairdresserSelectionStyle} from "@/components/hairdresser/styles/Hairdresser";
import React from "react";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {WeeksType} from "@/components/event/types/event";

export const WeekPreference: React.FC = () => {
    const user = useUser()
    const config = useConfig()
    const [updateUserPreference] = useWeekPreference()

    const onWeekChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user?.id, {'weekPreference': e.target.value})
        })
    };

    return  <HairdresserSelectionStyle>
        {getWeeks(config.scheduleWeekSpan).map((item: WeeksType) => {
            return (
                <div key={item.weekStart}>
                    <input type="radio" id={item.weekStart} name="week" value={item.weekStart} onClick={onWeekChange} />
                    <label htmlFor="week">{item.weekLabel}</label>
                </div>
            )
        })}
    </HairdresserSelectionStyle>
}