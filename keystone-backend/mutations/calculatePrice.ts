/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";
import {getEventPrice} from "../lib/price";

async function calculatePrice(
  root: any,
  { eventTypeId, shampoo, eventId }: { eventTypeId: string, shampoo: number, eventId: string },
  context: Context
): Promise<Int> {
  console.log('calculate price', {eventTypeId, shampoo, eventId})
  // 1. Query the current user see if they are signed in
  const eventType = await context.query.EventType.findOne({
    where: { id: eventTypeId },
    query: 'id base_price'
  });

  const event = await context.query.Event.findOne({
    where: { id: eventId },
    query: 'id eventHost { level }'
  });

  return getEventPrice(eventType.base_price, shampoo, event.eventHost.level);
}

export default calculatePrice;
