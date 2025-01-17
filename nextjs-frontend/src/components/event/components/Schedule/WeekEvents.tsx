import React from "react";
import {DayScheduleEvent, DaysType, KeystoneEvent} from "@/components/event/types/event";
import {getDays} from "@/lib/date";
import {WeekEventList, EventDetail} from "@/components/global/styles/ItemStyles";
import {NoDayEventList} from "@/components/event/components/Dashboard/Event/NoDayEventList";
import {DayEvent} from "@/components/event/models/DayEvent";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {DaySingleEvent} from "@/components/event/components/Schedule/DaySingleEvent";

interface ListingProps {
    events: KeystoneEvent[]
}

export const WeekEvents: React.FC<ListingProps> = ({events}: ListingProps) => {
    const user = useUser()

    if (!user) return null

    return (<WeekEventList>
        {getDays().map((day: DaysType) => {
            const dayEventHandler = new DayEvent(day);
            const dayEventList = dayEventHandler.getDaySchedule(events)

            return <EventDetail key={day.day}>
                <h4>{day.dayLabel}</h4>
                {dayEventList.length>0 && dayEventList.map((event: DayScheduleEvent, index: string) => {
                    return <DaySingleEvent key={index} event={event}/>
                })}
                {dayEventList.length===0 && <NoDayEventList key={day} />}
            </EventDetail>
        })}
    </WeekEventList>)
}