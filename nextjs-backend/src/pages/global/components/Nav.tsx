import NavStyles from "@/pages/global/styles/NavStyles";
import Link from "next/link";

export const Nav: React.FC = () => {
    return (
        <NavStyles>
                <>
                    <Link href="/events">Events</Link>
                </>
        </NavStyles>
    );
}