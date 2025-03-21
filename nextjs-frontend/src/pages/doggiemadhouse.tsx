import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroDoggieMadhouse from "@/components/venue/components/IntroDoggieMadhouse";
import {initVenue} from "@/lib/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'doggie-madhouse')
    }, []);

    initVenue(router, useIsEventHost())

    return (
        <IntroDoggieMadhouse />
    );
}