import {useRouter} from "next/router";
import React from "react";
import {ViewEvent} from "@/pages/event/components/Dashboard/Event/ViewEvent";

export default function Events() {
    const { query } = useRouter();
    const eventId = query.eventId;

    return (
        <>
            <ViewEvent eventId={eventId} />
        </>
    )
}