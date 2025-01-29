import React, {useState} from "react";
import {GetWeekEventsForMobile} from "@/components/event/components/VerticalDashboard/GetWeekEvents";
import {GetWeekEvents} from "@/components/event/components/Dashboard/GetWeekEvents";

export const EventDashboard: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth);

    return <>
        {width>=600 && <GetWeekEvents/>}
        {width<600 && <GetWeekEventsForMobile/>}
    </>
}