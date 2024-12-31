import React from "react";
import {useEvents} from "@/pages/event/hooks/useEvents";
import {NoEvent} from "@/pages/event/components/Dashboard/NoEvent";
import {WeekEvents} from "@/pages/event/components/Dashboard/WeekEvents";

interface ListingProps {
    page: number
}

export const GetWeekEvents: React.FC<ListingProps> = () => {
    const { data, loading } = useEvents()

    return <>
        {data?.events.length > 0 && <WeekEvents events={data?.events} />}
        {data?.events.length === 0 && <NoEvent />}
    </>
}