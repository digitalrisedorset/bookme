import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroPooleRugby from "@/components/venue/components/IntroPooleRugby";
import {initVenue} from "@/lib/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'poole-rugby')
    }, []);

    initVenue(router, useIsEventHost())

    return (
        <IntroPooleRugby />
    );
}