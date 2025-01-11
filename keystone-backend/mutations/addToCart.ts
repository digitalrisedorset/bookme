/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";
import calculatePrice from "./calculatePrice";
import calculateEventDuration from "./calculateEventDuration";
import updateEventAndRemoveOverlappingEvent from "./removeOverlappingEvent";

async function addToCart(
  root: any,
  { eventId, shampoo, haircutId }: { eventId: string, shampoo: number, haircutId: string },
  context: Context
): Promise<string> {
  console.log('addToCart', {eventId, shampoo, haircutId})
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

  const price = await calculatePrice(root, {haircutId, shampoo, eventId}, context)
  const endTime = await calculateEventDuration(root, {haircutId, shampoo, eventId}, context)

  // 4. if it isnt, create a new cart item!
  const record = await context.query.CartItem.createOne({
    data: {
      event: { connect: { id: eventId}},
      haircut: { connect: { id: haircutId}},
      shampoo,
      price,
      user: { connect: { id: sesh.itemId }},
    },
    query: 'id quantity'
  })

  const removeEventIds = await updateEventAndRemoveOverlappingEvent(root, {eventId, endTime}, context)

  return removeEventIds
}

export default addToCart;
