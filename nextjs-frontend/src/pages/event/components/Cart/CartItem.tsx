import React from "react";
import {CartItemStyles} from "@/pages/event/styles/CartStyles";
import {RemoveFromCart} from "@/pages/event/components/Cart/RemoveFromCart";
import {formatMoney} from "@/lib/price";
import {KeystoneCartItem} from "@/pages/event/types/event";

interface ItemProps {
    cartItem: KeystoneCartItem
}

export const CartItem: React.FC<ItemProps> = ({cartItem}: ItemProps) => {
    if (!cartItem) return null;

    return (
        <CartItemStyles>
            <div>
                <h3>{cartItem.event.venue.name} {cartItem.event.eventType.name}</h3>
                <p>
                    <em>
                        {cartItem.quantity} x {formatMoney(cartItem.event.price)} each = {formatMoney(cartItem.event.price * cartItem.quantity)}
                    </em>
                </p>
            </div>
            <RemoveFromCart id={cartItem.id} />
        </CartItemStyles>
    );
}