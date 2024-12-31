import {useEventFilterState} from "@/state/EventFilterProvider";
import {getWeeks} from "@/lib/date";
import {HairdresserSelectionStyle} from "@/pages/hairdresser/styles/Hairdresser";
import React from "react";

export const WeekPreference: React.FC = () => {
    const {setActiveWeek} = useEventFilterState()

    const onWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveWeek(e.target.value)
    };

    return  <HairdresserSelectionStyle>
        {getWeeks().map((item: any) => {
            return (
                <div key={item.weekStart}>
                    <input type="radio" id={item.weekStart} name="week" value={item.weekStart} onClick={onWeekChange} />
                    <label htmlFor="week">{item.weekLabel}</label>
                </div>
            )
        })}
    </HairdresserSelectionStyle>
}