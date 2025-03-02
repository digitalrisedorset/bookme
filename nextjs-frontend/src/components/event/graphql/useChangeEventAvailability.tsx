import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {BUSY, WALKIN} from "@/components/event/types/event";

export const EVENT_AVAILABILITY_MUTATION = gql`
    mutation UpdateEvent($where: EventWhereUniqueInput!, $data: EventUpdateInput!) {
      updateEvent(where: $where, data: $data) {
        id
      }
    }
`;

const update = (cache: InMemoryCache, payload: { data?: { updateEvent: string } }) => {
    const eventId = payload?.data?.updateEvent
    if (eventId === undefined) {
        return
    }

    const cacheKey = cache.identify({ __typename: "Event", id: eventId });
    if (cacheKey) {
        cache.evict({ id: cacheKey });
    }
}

export const useWalkIn = (id: string) => {
    const result = useMutation(EVENT_AVAILABILITY_MUTATION, {
        variables: { where: { id: id }, data: { status: WALKIN} },
        update
    });

    return result;
}

export const useSetAsBusy = (id: string) => {
    const result = useMutation(EVENT_AVAILABILITY_MUTATION, {
        variables: { where: { id: id }, data: { status: BUSY} },
        update
    });

    return result;
}