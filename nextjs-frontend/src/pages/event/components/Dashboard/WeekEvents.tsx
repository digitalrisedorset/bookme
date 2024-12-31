import React from "react";
import {DaysType, KeystoneEvent} from "@/pages/event/types/event";
import {getDays} from "@/lib/date";
import {WeekEventList, EventDetail} from "@/pages/global/styles/ItemStyles";
import {NoDayEventList} from "@/pages/event/components/Dashboard/Event/NoDayEventList";
import {DayEvent} from "@/pages/event/models/DayEvent";
import {DayEventGroup} from "@/pages/event/components/Dashboard/DayEvent/DayEventGroup";

interface ListingProps {
    events: KeystoneEvent[]
}

export const WeekEvents: React.FC<ListingProps> = ({events}: ListingProps) => {
    return (<WeekEventList>
        {getDays().map((day: DaysType) => {
            const dayEventHandler = new DayEvent(day);
            const dayEventList = dayEventHandler.getDayEvents(events)

            return <EventDetail key={day.day}>
                <h4>{day.dayLabel}</h4>
                {dayEventList.length>0 && dayEventList.map((eventGroup: any, index: string) => {
                    return <DayEventGroup key={index} eventGroup={eventGroup}/>
                })}
                {dayEventList.length===0 && <NoDayEventList key={day} />}
            </EventDetail>
        })}
    </WeekEventList>)
}