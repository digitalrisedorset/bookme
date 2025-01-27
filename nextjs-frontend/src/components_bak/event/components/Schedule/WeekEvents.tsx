import React from "react";
import {DayScheduleEvent, DaysType} from "@/components/event/types/event";
import {getDays} from "@/lib/date";
import {WeekEventList, EventDetail} from "@/components/global/styles/ItemStyles";
import {NoDayEventList} from "@/components/event/components/Dashboard/Event/NoDayEventList";
import {DayScheduleEventHandler} from "@/components/event/models/DayScheduleEventHandler";
import {useUser} from "@/components/user-authentication/hooks/useUser";
//import {DaySingleEvent} from "@/components/event/components/Schedule/DaySingleEvent";

interface ListingProps {
    events: DayScheduleEvent[]
}

export const WeekEvents: React.FC<ListingProps> = ({events}: ListingProps) => {
    const user = useUser()

    if (!user) return null

    return (<WeekEventList>
        {getDays().map((day: DaysType) => {
            const dayScheduleEventHandler = new DayScheduleEventHandler(day);
            const dayScheduleEventList = dayScheduleEventHandler.getDaySchedule(events)

            return <EventDetail key={day.day}>
                <h4>{day.dayLabel}</h4>
                {/*{dayScheduleEventList.length>0 && dayScheduleEventList.map((event: DayScheduleEvent, index: number) => {*/}
                {/*    return <DaySingleEvent key={index} event={event}/>*/}
                {/*})}*/}
                {dayScheduleEventList.length===0 && <NoDayEventList />}
            </EventDetail>
        })}
    </WeekEventList>)
}