/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";
import calculatePrice from "./calculatePrice";
import calculateEventDuration from "./calculateEventDuration";
import updateEventAndRemoveOverlappingEvent from "./removeOverlappingEvent";
import freecheckout from "./freecheckout";
import {verifyTurnstileToken} from "../lib/verifyTurnstile";
import {getRequestIp} from "../lib/request";

async function addToCart(
  root: any,
  { eventId, shampoo, eventTypeId, turnstileToken }: { eventId: string, shampoo: number, eventTypeId: string, turnstileToken: string },
  context: Context
): Promise<string> {
  const ip = getRequestIp(context.req);
  const isHuman = await verifyTurnstileToken(turnstileToken, ip);

  console.log('addToCart', {eventId, shampoo, eventTypeId, turnstileToken, ip, isHuman})

  if (!isHuman) {
    throw new Error("Human verification failed");
  }
  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // 2. Query the current users cart
  const allCartItems = await context.query.CartItem.findMany({
    where: { user: { id: {"equals": sesh.itemId }}, event: {id: {"equals": eventId } }},
    query: 'id quantity'
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(allCartItems)
    console.log(
        `There are already ${existingCartItem.quantity}, increment by 1!`
    );

    const record = await context.query.CartItem.updateOne({
      where: {id: existingCartItem.id},
      data: {quantity: existingCartItem.quantity + 1},
      query: 'id quantity',
    });

    return record
  }

  const price = await calculatePrice(root, {eventTypeId, shampoo, eventId}, context)
  const endTime = await calculateEventDuration(root, {eventTypeId, shampoo, eventId}, context)

  // 4. if it isnt, create a new cart item!
  const record = await context.query.CartItem.createOne({
    data: {
      event: { connect: { id: eventId}},
      eventType: { connect: { id: eventTypeId}},
      shampoo,
      price,
      user: { connect: { id: sesh.itemId }},
    },
    query: 'id quantity'
  })

  const removeEventIds = await updateEventAndRemoveOverlappingEvent(root, {eventId, endTime}, context)

  if (price === 0) { // send an email confirming the appointment is received
    await freecheckout(root, context)
  }

  return removeEventIds
}

export default addToCart;
