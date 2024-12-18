import Stripe from 'stripe';
import {keystoneconfig} from "../config";

const stripeConfig = new Stripe(keystoneconfig.stripe.secretKey, {
  apiVersion: '2020-08-27',
});

export default stripeConfig;
