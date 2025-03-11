import React from "react";
import {DaysType, KeystoneEvent} from "@/components/event/types/event";
import {getDays} from "@/lib/date";
import {WeekEventList} from "@/components/global/styles/ItemStyles";
import {Accordion} from "@/components/event/components/VerticalDashboard/Accordion";

interface ListingProps {
    events: KeystoneEvent[]
}

export const WeekEvents: React.FC<ListingProps> = ({events}: ListingProps) => {
    return (<>
            <WeekEventList className="accordion">
                {getDays().map((day: DaysType) => {
                    return (
                        <Accordion key={day.day} day={day} events={events} />
                    )
                })}
            </WeekEventList>
    </>)
}