import React, {useState} from "react";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {DayGroupEvent, DaysType, KeystoneEvent} from "@/components/event/types/event";
import {DayEventGroup} from "@/components/event/components/Dashboard/DayEvent/DayEventGroup";
import {NoDayEventList} from "@/components/event/components/Dashboard/Event/NoDayEventList";
import {DayEventHandler} from "@/components/event/models/DayEventHandler";
import {EventDetail, EventSummary} from "@/components/global/styles/ItemStyles";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

interface AccordionProps {
    day: DaysType
    events: KeystoneEvent[]
}

export const Accordion: React.FC<AccordionProps> = ({ day, events }: AccordionProps) => {
    const [isActive, setIsActive] = useState(false);
    const {activeVenue} = useVenueConfigState()

    const user = useUser()

    if (user === undefined) return

    const dayEventHandler = new DayEventHandler(day);
    const dayEventList = dayEventHandler.getDayEvents(events, user)

    return (<div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div><h4>{day.dayLabel}</h4></div>
                <div className="set-active">{isActive ? '-' : '+'}</div>
            </div>
            {!isActive && <EventSummary>
                {dayEventList.length>0 && <>{dayEventList.length} {tr('appointment', activeVenue)}s available</>}
                {dayEventList.length===0 && <NoDayEventList />}
            </EventSummary>}
            {isActive && <EventDetail>
                {dayEventList.length>0 && dayEventList.map((eventGroup: DayGroupEvent, index: number) => {
                    return <DayEventGroup key={index} eventGroup={eventGroup}/>
                })}
                {dayEventList.length===0 && <NoDayEventList />}
            </EventDetail>}
        </div>
    )
}