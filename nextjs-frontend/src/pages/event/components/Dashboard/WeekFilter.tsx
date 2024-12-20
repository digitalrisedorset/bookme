import {Venue} from "@/pages/venue/styles/Venue";
import {Label} from "@/pages/global/styles/Form";
import {useEventFilterState} from "@/state/EventFilterProvider";
import React from "react";

export const WeekFilter: React.FC = () => {
    const {setActiveWeeks, eventFilter} = useEventFilterState()

    const onWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setActiveWeeks(e.target.value)
    }

    const getWeeks = () => {
        const result = []
        for (var i = 0; i < 50; i++) {
            result.push(i)
        }

        return result
    }

    return (
        <Venue>
            <fieldset>
                <Label>Weeks Ahead</Label>
                <select onChange={onWeekChange} className="form-select">
                    <option value="">-</option>
                    {getWeeks().map((index) => {
                        const selected = (eventFilter.activeWeeks === index)?'selected':''
                        return (<option key={index} value={index} selected={selected}>{index}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}