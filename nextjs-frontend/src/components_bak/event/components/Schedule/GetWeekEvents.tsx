import React from "react";
import {NoEvent} from "@/components/event/components/Dashboard/NoEvent";
import {WeekEvents} from "@/components/event/components/Schedule/WeekEvents";
import {useSchedule} from "@/components/event/hooks/useSchedule";
import {Loading} from "@/components/global/components/Loading";

interface ListingProps {
    page: number
}

export const GetWeekEvents: React.FC<ListingProps> = () => {
    const { data, loading } = useSchedule()

    if (loading) return <Loading />

    return <>
        {data?.events.length > 0 && <WeekEvents events={data?.events} />}
        {data?.events.length === 0 && <NoEvent />}
    </>
}