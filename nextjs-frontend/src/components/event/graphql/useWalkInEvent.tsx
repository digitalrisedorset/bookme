import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {WALKIN} from "@/components/event/types/event";

export const WALKIN_MUTATION = gql`
    mutation UpdateEvent($where: EventWhereUniqueInput!, $data: EventUpdateInput!) {
      updateEvent(where: $where, data: $data) {
        id
      }
    }
`;

const update = (cache: InMemoryCache, payload: { data?: { addToCart: string } }) => {
    const eventIds = payload?.data?.addToCart.split(',')
    if (eventIds === undefined) {
        return
    }

    eventIds.forEach(eventId => {
        cache.evict({id: `Event:${eventId}`});
    })
    cache.gc();
}

export const useWalkIn = (id: string) => {
    const result = useMutation(WALKIN_MUTATION, {
        variables: { where: { id: id }, data: { status: WALKIN} },
        update
    });

    return result;
}