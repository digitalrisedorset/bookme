import Link from "next/link";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useConfig} from "@/components/venue/hooks/useConfig";

export const CustomerNav: React.FC = () => {
    const config = useConfig()

    if (useIsEventHost()) return null

    return (
        <>
            <Link href="/events">Events</Link>
            {config.showPrice && <Link href="/orders">Orders</Link>}
            {/*<Link href="/account">Account</Link>*/}
        </>
    );
}