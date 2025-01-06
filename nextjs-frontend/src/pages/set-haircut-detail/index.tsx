import {useRouter} from "next/router";
import React from "react";
import {ViewGroupEvent} from "@/pages/event/components/Dashboard/Event/ViewGroupEvent";

export default function Events() {
    const { query } = useRouter();
    const eventIds = JSON.parse(decodeURIComponent(query.eventIds));

    return (
        <>
            <ViewGroupEvent eventIds={eventIds} />
        </>
    )
}