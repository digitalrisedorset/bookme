import React from "react";
import {useEvents} from "@/components/event/hooks/useEvents";
import {Event} from "@/components/event/components/Dashboard/Event";
import {KeystoneEvent} from "@/components/event/types/event";
import {EventList} from "@/components/global/styles/ItemStyles";
import {NoEvent} from "@/components/event/components/Dashboard/NoEvent";

interface ListingProps {
    page: number
}

export const GetEvents: React.FC<ListingProps> = () => {
    const { data, loading } = useEvents()

    if (loading) return <>Loading</>

    return <EventList>
            {data?.events.length > 0 && data?.events.map(
                (event: KeystoneEvent) => <Event key={event.id} event={event} />
            )}
            {data?.events.length === 0 && <NoEvent />}
        </EventList>
}