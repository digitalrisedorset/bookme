import React from "react";
import {DayGroupEvent} from "@/components/event/types/event";
import {SingleEvent} from "@/components/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {SetEventDetail} from "@/components/event/components/Dashboard/Event/SetEventDetail";
import {HairdresserView} from "@/components/event/components/Dashboard/DayEvent/HairdresserView";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const DayEventGroup: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    return (<SingleEvent status={eventGroup.status}>
        <p>{getTime(eventGroup.startTime)}</p>
        <HairdresserView eventGroup={eventGroup}/>
        <SetEventDetail eventGroup={eventGroup}/>
    </SingleEvent>)
}