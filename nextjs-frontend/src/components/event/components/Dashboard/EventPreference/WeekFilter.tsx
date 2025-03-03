import {getWeeks} from "@/lib/date";
import {EventHostSelectionStyle} from "@/components/eventHost/styles/EventHostStyle";
import React from "react";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {WeeksType} from "@/components/event/types/event";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";
import {useUserPreferenceState} from "@/state/UserPreference";

export const WeekPreference: React.FC = () => {
    const {setWeekPreference} = useUserPreferenceState()
    const config = useConfig()

    const onWeekChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        setWeekPreference(input.value)
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