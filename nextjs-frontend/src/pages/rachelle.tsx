import IntroRachelle from "@/components/venue/components/IntroRachelle";
import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'rachelle-hairdressing')
    }, []);

    if (useIsEventHost()) {
        router.push({pathname: `/schedule`});
        return
    } else {
        router.push({pathname: `/`});
    }

    return (
        <IntroRachelle />
    );
}