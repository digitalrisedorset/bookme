import {useRouter} from "next/router";
import React from "react";
import {ViewGroupEvent} from "@/components/event/components/Dashboard/Event/ViewGroupEvent";
import {sanitiseString} from "@/lib/string";

export default function Events() {
    const { query } = useRouter();
    const router = useRouter()

    const queryEventIds = sanitiseString(query.eventIds);

    if (queryEventIds === undefined) {
        router.push({pathname: '/events'});
        return
    }

    const eventIds = JSON.parse(decodeURIComponent(queryEventIds));

    return (
        <ViewGroupEvent eventIds={eventIds} />
    )
}