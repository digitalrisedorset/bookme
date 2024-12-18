/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";

async function addToCart(
  root: any,
  { eventId }: { eventId: string },
  context: Context
): Promise<CartItemCreateInput> {
  console.log('addToCart', eventId)
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

    console.log('new quantity', {
      id: existingCartItem.id,
      quantity: existingCartItem.quantity + 1
    })

    const record = await context.query.CartItem.updateOne({
      where: {id: existingCartItem.id},
      data: {quantity: existingCartItem.quantity + 1},
      query: 'id quantity',
    });

    return record
  }

  // 4. if it isnt, create a new cart item!
  const record = await context.query.CartItem.createOne({
    data: {
      event: { connect: { id: eventId}},
      user: { connect: { id: sesh.itemId }},
    },
    query: 'id quantity'
  })

  return record
}

export default addToCart;
