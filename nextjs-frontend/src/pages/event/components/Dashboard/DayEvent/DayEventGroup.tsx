import React from "react";
import {DayGroupEvent} from "@/pages/event/types/event";
import {SingleEvent} from "@/pages/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {HairdresserSelect} from "@/pages/event/components/Dashboard/DayEvent/HairdresserSelect";
import {SetEventDetail} from "@/pages/event/components/Dashboard/Event/SetEventDetail";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const DayEventGroup: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    return (<SingleEvent>
        <p>{getTime(eventGroup.startTime)}</p>
        <HairdresserSelect eventGroup={eventGroup}/>
        <SetEventDetail eventGroup={eventGroup}/>
    </SingleEvent>)
}