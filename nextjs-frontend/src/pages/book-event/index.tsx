import {useRouter} from "next/router";
import React from "react";
import {ViewEventToBook} from "@/components/event/components/Schedule/ViewEventToBook";
import {sanitiseString} from "@/lib/string";

export default function Events() {
    const { query } = useRouter();
    const router = useRouter()

    if (query.eventId === undefined) {
        router.push({pathname: '/schedule'});
        return
    }

    const eventId = sanitiseString(query.eventId);

    if (!eventId) return

    return (
        <ViewEventToBook eventId={eventId} />
    )
}