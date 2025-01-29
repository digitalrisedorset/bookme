import React from "react";
import {useEvents} from "@/components/event/hooks/useEvents";
import {NoEvent} from "@/components/event/components/Dashboard/NoEvent";
import {WeekEvents} from "@/components/event/components/VerticalDashboard/WeekEvents";
import {Loading} from "@/components/global/components/Loading";

export const GetWeekEventsForMobile: React.FC = () => {
    const { data, loading } = useEvents()

    if (loading) return <Loading />

    return <>
        {data?.events.length > 0 && <WeekEvents events={data?.events} />}
        {data?.events.length === 0 && <NoEvent />}
    </>
}