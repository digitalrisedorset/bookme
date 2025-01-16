import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {WALKIN} from "@/components/event/types/event";

export const WALKIN_MUTATION = gql`
    mutation UpdateEvent($where: EventWhereUniqueInput!, $data: EventUpdateInput!) {
      updateEvent(where: $where, data: $data) {
        id
      }
    }
`;

function update(cache, payload) {
    const eventIds = payload.data.addToCart.split(',')
    eventIds.forEach(eventId => {
        cache.evict({id: `Event:${eventId}`});
    })
    cache.gc();
}

export const useWalkIn = (id: string) => {
    const [updateEvent, { loading }] = useMutation(WALKIN_MUTATION, {
        variables: { where: { id: id }, data: { status: WALKIN} },
        update
    });

    return [updateEvent, { loading }];
}