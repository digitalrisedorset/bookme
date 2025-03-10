import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "@/components/user-authentication/hooks/useUser";
import {useEventState} from "@/state/EventState";
import {InMemoryCache} from "@apollo/client/cache/inmemory/inMemoryCache";
import {useUserPreferenceState} from "@/state/UserPreference";

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($eventId: ID!, $eventTypeId: ID!, $shampoo: Int) {
    addToCart(eventId: $eventId, eventTypeId: $eventTypeId, shampoo: $shampoo)
  }
`;

function update(cache: InMemoryCache, payload: { data?: {addToCart: string } }) {
    const eventIds = payload?.data?.addToCart.split(',')
    if (eventIds === undefined) {
        return
    }

    eventIds.forEach(eventId => {
        cache.evict({id: `Event:${eventId}`});
    })
    cache.gc();
}

export const useAddToCart = () => {
    const {eventState} = useEventState()
    const {userPreference} = useUserPreferenceState()

    const result = useMutation(ADD_TO_CART_MUTATION, {
        variables: { eventId: eventState.activeEventId, shampoo: (eventState.shampoo === true)?1:0, eventTypeId: userPreference?.eventTypeId },
        update,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => {
            console.log("Mutation ADD_TO_CART_MUTATION completed, refetching queries...");
        }
    });

    return result;
}
