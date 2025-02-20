import IntroBlushHarry from "@/components/venue/components/IntroBlushHarry";
import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'blush-harry')
    }, []);

    if (useIsEventHost()) {
        router.push({pathname: `/schedule`});
    } else {
        router.push({pathname: `/`});
    }

    return (
        <IntroBlushHarry />
    );
}
