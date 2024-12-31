import React from "react";
import {CartItemStyles} from "@/pages/event/styles/CartStyles";
import {RemoveFromCart} from "@/pages/event/components/Cart/RemoveFromCart";
import {formatMoney} from "@/lib/price";
import {KeystoneCartItem} from "@/pages/event/types/event";
import {getEventTitle} from "@/lib/event";

interface ItemProps {
    cartItem: KeystoneCartItem
}

export const CartItem: React.FC<ItemProps> = ({cartItem}: ItemProps) => {
    if (!cartItem) return null;

    return (
        <CartItemStyles>
            <div>
                <h3>{getEventTitle(cartItem.event)}</h3>
                <span className="haircut">{cartItem.haircut.name}</span>
                <p>
                    <em>
                        {cartItem.quantity} x {formatMoney(cartItem.price)} each = {formatMoney(cartItem.price * cartItem.quantity)}
                    </em>
                </p>
            </div>
            <RemoveFromCart id={cartItem.id} />
        </CartItemStyles>
    );
}