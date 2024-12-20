import React from "react";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {CartStyles} from "@/pages/event/styles/CartStyles";
import {useCart} from "@/state/CartState";
import {CartItem} from "@/pages/event/components/Cart/CartItem";
import {Checkout} from "@/pages/event/components/Checkout";
import calcTotalPrice, {formatMoney} from "@/lib/price";
import CloseButton from "@/pages/event/styles/CloseButton";

export const Cart: React.FC = () => {
    const user = useUser();
    const { cartOpen, closeCart } = useCart()

    if (!user) return null;

    return (
        <CartStyles open={cartOpen}>
            <header>
                <p>{user.name}'s Cart</p>
                <CloseButton onClick={closeCart}>&times;</CloseButton>
            </header>
            <ul>
                {user.cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem}/>
                ))}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(user.cartItems))}</p>
                {/*<Checkout />*/}
            </footer>
        </CartStyles>
    );
}