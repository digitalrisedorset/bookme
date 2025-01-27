import React from "react";
import {DayGroupEvent, DaysType, KeystoneEvent} from "@/components/event/types/event";
import {getDays} from "@/lib/date";
import {WeekEventList, EventDetail} from "@/components/global/styles/ItemStyles";
import {NoDayEventList} from "@/components/event/components/Dashboard/Event/NoDayEventList";
import {DayEventHandler} from "@/components/event/models/DayEventHandler";
import {DayEventGroup} from "@/components/event/components/Dashboard/DayEvent/DayEventGroup";
import {useUser} from "@/components/user-authentication/hooks/useUser";

interface ListingProps {
    events: KeystoneEvent[]
}

export const WeekEvents: React.FC<ListingProps> = ({events}: ListingProps) => {
    const user = useUser()

    if (!user) return null

    return (<WeekEventList>
        {getDays().map((day: DaysType) => {
            const dayEventHandler = new DayEventHandler(day);
            const dayEventList = dayEventHandler.getDayEvents(events, user)

            return <EventDetail key={day.day}>
                <h4>{day.dayLabel}</h4>
                {dayEventList.length>0 && dayEventList.map((eventGroup: DayGroupEvent, index: number) => {
                    return <DayEventGroup key={index} eventGroup={eventGroup}/>
                })}
                {dayEventList.length===0 && <NoDayEventList />}
            </EventDetail>
        })}
    </WeekEventList>)
}