import {
    CardNumberElement
} from '@stripe/react-stripe-js';
import React from "react";
import {StripeElementsStyles} from "@/components/event/components/Checkout/CheckoutForm";

export const CardNumberElementField: React.FC = () => {
    return (
        <>
            <label htmlFor="cardNumber">Card Number</label>
            <CardNumberElement id="cardNumber" options={StripeElementsStyles} />
        </>
    );
}