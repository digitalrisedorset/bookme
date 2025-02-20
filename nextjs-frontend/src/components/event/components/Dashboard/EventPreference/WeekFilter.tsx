import {getWeeks} from "@/lib/date";
import {EventHostSelectionStyle} from "@/components/eventHost/styles/EventHostStyle";
import React from "react";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {WeeksType} from "@/components/event/types/event";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";

export const WeekPreference: React.FC = () => {
    const user = useUser()
    const config = useConfig()
    const [updateUserPreference] = useWeekPreference()

    if (user === undefined) return

    const onWeekChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'weekPreference': input.value})
        })
    };

    return  <EventHostSelectionStyle>
        {getWeeks(config.scheduleWeekSpan).map((item: WeeksType) => {
            return (
                <PreferenceChoice key={item.weekStart}>
                    <input type="radio" id={item.weekStart} name="week" value={item.weekStart} onClick={onWeekChange} />
                    <label htmlFor={item.weekStart}>{item.weekLabel}</label>
                </PreferenceChoice>
            )
        })}
    </EventHostSelectionStyle>
}