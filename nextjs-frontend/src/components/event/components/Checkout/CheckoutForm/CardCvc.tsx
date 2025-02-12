import {
    CardCvcElement
} from '@stripe/react-stripe-js';
import React from "react";
import {StripeElementsStyles} from "@/components/event/components/Checkout/CheckoutForm";

export const CardCvcElementField: React.FC = () => {
    return (
        <>
            <label htmlFor="cardCvc">Card Verification Code</label>
            <CardCvcElement id="cardCvc" options={StripeElementsStyles} />
        </>
    );
}