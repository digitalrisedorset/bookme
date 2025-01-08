import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY, useUser} from "@/components/user-authentication/hooks/useUser";
import {useEventState} from "@/state/EventState";

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($eventId: ID!, $haircutId: ID!, $shampoo: Int) {
    addToCart(eventId: $eventId, haircutId: $haircutId, shampoo: $shampoo) {
      id
    }
  }
`;

export const useAddToCart = (id: string) => {
    const {shampoo} = useEventState()
    const user = useUser()

    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { eventId: id, shampoo: (shampoo === true)?1:0, haircutId: user?.haircutType.id },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return [addToCart, { loading }];
}