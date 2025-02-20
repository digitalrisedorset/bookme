import React from "react";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {EventType} from "@/components/event/types/event";


interface EventTypeProps {
    eventTypes: EventType[]
}

export const EventTypeSelect: React.FC<EventTypeProps> = ({eventTypes}: EventTypeProps) => {
    const { setEventTypePreference} = useEventState()

    const handleSelect = (e: React.MouseEvent<HTMLInputElement>) => {
        //e.preventDefault();
        const input = e.target as HTMLInputElement
        setEventTypePreference(input.value)
    }

    return <SelectStyle>
        {eventTypes.map((eventType: EventType) => {
            return (
                <div key={eventType.name}>
                    <input type="radio" id={eventType.id} name="eventType" value={eventType.id} onClick={handleSelect}/>
                    <label htmlFor="eventType">{eventType.name}</label>
                </div>
            )
        })}
    </SelectStyle>
}