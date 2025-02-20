import Link from "next/link";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";

export const CustomerNav: React.FC = () => {
    if (useIsEventHost()) return null

    return (
        <>
            <Link href="/events">Events</Link>
            <Link href="/orders">Orders</Link>
            {/*<Link href="/account">Account</Link>*/}
        </>
    );
}