import NavStyles from "@/components/global/styles/NavStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useCart} from "@/state/CartState";
import Link from "next/link";
import {SignOut} from "@/components/user-authentication/components/SignOut";
import {CartCount} from "@/components/event/components/CartCount";

export const Nav: React.FC = () => {
    const user = useUser();
    const { toggleCart } = useCart()

    return (
        <NavStyles>
            {user && (
                <>
                    {/*<Link href="/account">Account</Link>*/}
                    <Link href="/events">Events</Link>
                    <Link href="/orders">Orders</Link>
                    <SignOut/>
                    <button type="button" onClick={toggleCart}>
                        Cart
                        <CartCount count={user.cartItems.reduce(
                            (tally, cartItem) => tally + cartItem.quantity, 0
                        )}/>
                    </button>
                </>)}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                </>
            )}
        </NavStyles>
    );
}