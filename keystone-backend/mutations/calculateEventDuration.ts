/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";
import {getEventEndTime} from "../lib/event";

async function calculateEventDuration(
  root: any,
  { eventTypeId, shampoo, eventId }: { eventTypeId: string, shampoo: number, eventId: string },
  context: Context
): Promise<string> {
  console.log('event duration', {eventTypeId, shampoo, eventId})

  const eventType = await context.query.EventType.findOne({
    where: { id: eventTypeId },
    query: 'id duration breakTime'
  });

  const event = await context.query.Event.findOne({
    where: { id: eventId },
    query: 'id startTime eventHost { level }'
  });

  return getEventEndTime(eventType.duration, eventType.breakTime, event.startTime, shampoo, event.eventHost.level);
}

export default calculateEventDuration;
