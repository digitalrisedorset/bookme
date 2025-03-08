import React from "react";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {Index} from "@/components/event/components/Dashboard/Index";
import {UserPreferenceStateProvider} from "@/state/UserPreference";
import {Loading} from "@/components/global/components/Loading";

export default function Events() {
    const {data, loading} = useEventTypeGroups()

    if (loading) return <Loading />

    return (
        <UserPreferenceStateProvider eventTypeGroups={data?.venueEventTypeGroups}>
            <Index />
        </UserPreferenceStateProvider>
    )
}