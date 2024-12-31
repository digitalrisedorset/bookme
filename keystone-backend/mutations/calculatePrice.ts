/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";
import {getEventPrice} from "../lib/price";

async function calculatePrice(
  root: any,
  { haircutId, shampoo, eventId }: { haircutId: string, shampoo: number, eventId: string },
  context: Context
): Promise<Int> {
  console.log('addToCart', {haircutId, shampoo, eventId})
  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  const haircut = await context.query.HaircutType.findOne({
    where: { id: haircutId },
    query: 'id base_price'
  });

  const event = await context.query.Event.findOne({
    where: { id: eventId },
    query: 'id hairdresser { level }'
  });

  return getEventPrice(haircut.base_price, shampoo, event.hairdresser.level);
}

export default calculatePrice;
