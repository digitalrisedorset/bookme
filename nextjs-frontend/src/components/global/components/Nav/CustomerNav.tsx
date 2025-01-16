import Link from "next/link";
import {isHairdresser} from "@/components/user-authentication/hooks/useUserRole";

export const CustomerNav: React.FC = () => {
    if (isHairdresser()) return null

    return (
        <>
            <Link href="/events">Events</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
        </>
    );
}