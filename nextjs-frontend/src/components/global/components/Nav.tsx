import NavStyles from "@/components/global/styles/NavStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useCart} from "@/state/CartState";
import Link from "next/link";
import {HairddresserNav} from "@/components/global/components/Nav/HairddresserNav";
import {CustomerNav} from "@/components/global/components/Nav/CustomerNav";
import {SignOut} from "@/components/user-authentication/components/SignOut";
import {CartCount} from "@/components/event/components/CartCount";
import VenueTitle from "@/components/venue/components/VenueTitle";
import {useConfig} from "@/components/venue/hooks/useConfig";

export const Nav: React.FC = () => {
    const user = useUser();
    const { toggleCart } = useCart()
    const config = useConfig()

    return (
        <NavStyles colors={config?.themeColors}>
            <VenueTitle />
            {user && (
                <>
                    <HairddresserNav />
                    <CustomerNav />
                    <SignOut/>
                    {!user?.role?.isEventHost && <button type="button" onClick={toggleCart}>
                        Cart
                        <CartCount count={user.cartItems.reduce(
                            (tally, cartItem) => tally + cartItem.quantity, 0
                        )}/>
                    </button>}
                </>)}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                    <Link href="/signup">Sign Up</Link>
                </>
            )}
        </NavStyles>
    );
}