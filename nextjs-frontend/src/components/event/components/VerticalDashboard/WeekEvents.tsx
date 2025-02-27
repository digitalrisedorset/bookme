import React from "react";
import {DaysType, KeystoneEvent} from "@/components/event/types/event";
import {getDays} from "@/lib/date";
import {WeekEventList} from "@/components/global/styles/ItemStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {Accordion} from "@/components/event/components/VerticalDashboard/Accordion";

interface ListingProps {
    events: KeystoneEvent[]
}

export const WeekEvents: React.FC<ListingProps> = ({events}: ListingProps) => {
    const user = useUser()

    if (!user) return null

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