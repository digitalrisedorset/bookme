import {useRouter} from "next/router";
import React from "react";
import {ViewGroupEvent} from "@/components/event/components/Dashboard/Event/ViewGroupEvent";
import {sanitiseString} from "@/lib/string";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {Loading} from "@/components/global/components/Loading";
import {UserPreferenceStateProvider} from "@/state/UserPreference";

export default function Events() {
    const { query } = useRouter();
    const router = useRouter()
    const {data, loading} = useEventTypeGroups()

    const queryEventIds = sanitiseString(query.eventIds);

    if (queryEventIds === undefined) {
        router.push({pathname: '/events'});
        return
    }

    const eventIds = JSON.parse(decodeURIComponent(queryEventIds));

    if (loading) return <Loading />

    return (
        <UserPreferenceStateProvider eventTypeGroups={data?.venueEventTypeGroups}>
            <ViewGroupEvent eventIds={eventIds} />
        </UserPreferenceStateProvider>
    )
}