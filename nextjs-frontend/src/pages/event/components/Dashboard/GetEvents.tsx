import React from "react";
import {useEvents} from "@/pages/event/hooks/useEvents";
import {Event} from "@/pages/event/components/Dashboard/Event";
import {KeystoneEvent} from "@/pages/event/types/event";
import {EventList} from "@/pages/global/styles/ItemStyles";
import {NoEvent} from "@/pages/event/components/Dashboard/NoEvent";

interface ListingProps {
    page: number
}

export const GetEvents: React.FC<ListingProps> = ({page}: ListingProps) => {
    const { data, error, loading } = useEvents(page)

    if (loading) return <>Loading</>

    return <EventList>
            {data?.events.length > 0 && data?.events.map(
                (event: KeystoneEvent) => <Event key={event.id} event={event} />
            )}
            {data?.events.length === 0 && <NoEvent />}
        </EventList>
}