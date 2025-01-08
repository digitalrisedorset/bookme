/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";
import {getEventEndTime} from "../lib/event";

async function calculateEventDuration(
  root: any,
  { haircutId, shampoo, eventId }: { haircutId: string, shampoo: number, eventId: string },
  context: Context
): Promise<string> {
  console.log('event duration', {haircutId, shampoo, eventId})
  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  const haircut = await context.query.HaircutType.findOne({
    where: { id: haircutId },
    query: 'id duration breakTime'
  });

  const event = await context.query.Event.findOne({
    where: { id: eventId },
    query: 'id startTime hairdresser { level }'
  });

  console.log('event duration 2', {
    duration: haircut.duration,
    break: haircut.breakTime,
    start: event.startTime,
    shampoo,
    level: event.hairdresser.level
  })

  return getEventEndTime(haircut.duration, haircut.breakTime, event.startTime, shampoo, event.hairdresser.level);
}

export default calculateEventDuration;
