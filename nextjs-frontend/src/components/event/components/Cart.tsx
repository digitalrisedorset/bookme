import React from "react";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {CartStyles} from "@/components/event/styles/CartStyles";
import {useCart} from "@/state/CartState";
import {CartItem} from "@/components/event/components/Cart/CartItem";
import calcTotalPrice, {formatMoney} from "@/lib/price";
import CloseButton from "@/components/event/styles/CloseButton";
import {Checkout} from "@/components/event/components/Checkout";

export const Cart: React.FC = () => {
    const user = useUser();
    const { cartOpen, closeCart } = useCart()

    if (!user) return null;

    return (
        <CartStyles open={cartOpen}>
            <header>
                <p>{user.name}&apos;s Cart</p>
                <CloseButton onClick={closeCart}>&times;</CloseButton>
            </header>
            <ul>
                {user.cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem}/>
                ))}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(user.cartItems))}</p>
                <Checkout />
            </footer>
        </CartStyles>
    );
}