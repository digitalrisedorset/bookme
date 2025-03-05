import React from "react";
import {DayGroupEvent} from "@/components/event/types/event";
import {SingleEvent} from "@/components/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {SetEventDetail} from "@/components/event/components/Dashboard/Event/SetEventDetail";
import {EventHostView} from "@/components/event/components/Dashboard/DayEvent/EventHostView";
import {EventStateProvider} from "@/state/EventState";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const DayEventGroup: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    return (
        <EventStateProvider eventGroup={eventGroup}>
            <SingleEvent status={eventGroup.status}>
                <p>{getTime(eventGroup.startTime)}</p>
                <EventHostView eventGroup={eventGroup}/>
                <SetEventDetail eventGroup={eventGroup}/>
            </SingleEvent>
        </EventStateProvider>)
}