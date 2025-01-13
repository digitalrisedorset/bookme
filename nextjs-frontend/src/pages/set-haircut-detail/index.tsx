import {useRouter} from "next/router";
import React from "react";
import {ViewGroupEvent} from "@/components/event/components/Dashboard/Event/ViewGroupEvent";

export default function Events() {
    const { query } = useRouter();
    const router = useRouter()

    if (query.eventIds === undefined) {
        router.push({pathname: '/events'});
        return
    }

    const eventIds = JSON.parse(decodeURIComponent(query.eventIds));

    return (
        <>
            <ViewGroupEvent eventIds={eventIds} />
        </>
    )
}