import React from "react";
import {BigButton} from "@/components/event/styles/CartStyles";
import {useRemoveFromCart} from "@/components/event/graphql/useRemoveFromCart";

interface RemoveCartProps {
    id: string
}

export const RemoveFromCart: React.FC<RemoveCartProps> = ({id}: RemoveCartProps) => {
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