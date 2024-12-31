import React from "react";
import {DayGroupEvent} from "@/pages/event/types/event";
import {getGroupEventHairdresserInfo} from "@/pages/event/models/DayGroupEvent";
import {useEventState} from "@/state/EventState";
import {capitalise} from "@/lib/string";
import {useEventFilterState} from "@/state/EventFilterProvider";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const HairdresserSelect: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {toggleActiveEvent} = useEventState()
    const {eventFilter} = useEventFilterState()

    const getKey = (startTime: string, hairdresser: string) => {
        const date = new Date(startTime).getTime()

        return `${date}-${hairdresser}`
    }

    const handleSelect = (e: React.FormEvent) => {
        //e.preventDefault();
        toggleActiveEvent(e.target.value)
    }

    return <div className="hairdresser-selection">
        {getGroupEventHairdresserInfo(eventGroup).map(({hairdresser, eventId}: { hairdresser: string, eventId: string }) => {
            return (
                <div key={getKey(eventGroup.startTime, hairdresser)}>
                    {/*<input type="radio" name="hairdresser" value={eventId} onChange={handleSelect} />*/}
                    {/*<label htmlFor="hairdresser">{capitalise(hairdresser)}</label>*/}
                </div>
            )
        })}
    </div>
}