import React from "react";
import {CheckoutForm} from "@/components/event/components/Checkout/CheckoutForm";

import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {config} from "@/config";

const stripeLib = loadStripe(config.stripe.public_key);

export const Checkout: React.FC = () => {
    return (<Elements stripe={stripeLib}>
        <CheckoutForm />
    </Elements>)
}