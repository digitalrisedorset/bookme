import React from "react";
import {CheckoutForm} from "@/pages/event/components/Checkout/CheckoutForm";

import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {config} from "@/pages/config";

const stripeLib = loadStripe(config.stripe.public_key);

export const Checkout: React.FC = () => {
    return (<Elements stripe={stripeLib}>
        <CheckoutForm />
    </Elements>)
}