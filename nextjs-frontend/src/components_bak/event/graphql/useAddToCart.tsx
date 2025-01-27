import gql from "graphql-tag";
import { useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY, useUser} from "@/components/user-authentication/hooks/useUser";
import {useEventState} from "@/state/EventState";
import {InMemoryCache} from "@apollo/client/cache/inmemory/inMemoryCache";
import {clearApolloCache} from "@/lib/cache";

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($eventId: ID!, $haircutId: ID!, $shampoo: Int) {
    addToCart(eventId: $eventId, haircutId: $haircutId, shampoo: $shampoo)
  }
`;

function update(cache: InMemoryCache, payload: { data?: {addToCart: string } }) {
    const eventIds = payload?.data?.addToCart.split(',')
    if (eventIds === undefined) {
        return
    }

    eventIds.forEach(eventId => {
        clearApolloCache(cache, eventId)
    })
    cache.gc();
}

export const useAddToCart = (id: string) => {
    const {eventState} = useEventState()
    const user = useUser()

    const result = useMutation(ADD_TO_CART_MUTATION, {
        variables: { eventId: id, shampoo: (eventState.shampoo === true)?1:0, haircutId: user?.haircutType?.id },
        update,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return result;
}