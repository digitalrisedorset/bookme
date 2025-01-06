import React from "react";
import {DayGroupEvent} from "@/pages/event/types/event";
import {SingleEvent} from "@/pages/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {SetEventDetail} from "@/pages/event/components/Dashboard/Event/SetEventDetail";
import {HairdresserView} from "@/pages/event/components/Dashboard/DayEvent/HairdresserView";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const DayEventGroup: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    return (<SingleEvent>
        <p>{getTime(eventGroup.startTime)}</p>
        <HairdresserView eventGroup={eventGroup}/>
        <SetEventDetail eventGroup={eventGroup}/>
    </SingleEvent>)
}