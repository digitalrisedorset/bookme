import React from "react";
import {useAddToCart} from "@/pages/event/graphql/useAddToCart";
import {useUser} from "@/pages/user-authentication/hooks/useUser";

interface AddToCartProps {
    id: string
}

export const AddToCart: React.FC<AddToCartProps> = ({id}: AddToCartProps) => {
    const user = useUser()
    const [addToCart, { loading }] = useAddToCart(id);

    if (!user) return null;

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        const res = await addToCart().catch(console.error);
    }

    return (
        <button className="add-to-cart" disabled={loading} type="button" onClick={handleClick}>
            Add{loading && 'ing'} To Cart 🛒
        </button>
    );
}