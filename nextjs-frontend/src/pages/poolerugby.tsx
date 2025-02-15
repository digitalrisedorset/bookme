import {useRouter} from "next/router";
import {useIsHairdresser} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroPooleRugby from "@/components/venue/components/IntroPooleRugby";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'poole-rugby')
    }, []);

    if (useIsHairdresser()) {
        router.push({pathname: `/schedule`});
    } else {
        router.push({pathname: `/`});
    }

    return (
        <IntroPooleRugby />
    );
}
