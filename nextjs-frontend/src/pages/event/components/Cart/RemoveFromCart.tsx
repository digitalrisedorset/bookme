import React from "react";
import {BigButton} from "@/pages/event/styles/CartStyles";
import {useRemoveFromCart} from "@/pages/event/graphql/useRemoveFromCart";

export const RemoveFromCart: React.FC = ({id}) => {
    const [removeFromCart, { loading }] = useRemoveFromCart(id)

    return (
        <BigButton
            onClick={removeFromCart}
            disabled={loading}
            type="button"
            title="Remove This Item from Cart"
        >
            &times;
        </BigButton>
    )
}