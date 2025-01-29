import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "@/components/user-authentication/hooks/useUser";

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation DeleteCartItem($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      id
    }
  }
`;

export const useRemoveFromCart = (id: string): [() => void, {loading: boolean}] => {
    const update = (cache: InMemoryCache, payload: { data?: { deleteCartItem?: { id: string } } }) => {
        const itemToDelete = payload?.data?.deleteCartItem;

        if (itemToDelete) {
            cache.evict(cache.identify(itemToDelete));
            cache.gc();
        } else {
            console.error("Invalid payload structure:", payload);
        }
    }

    const result = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: { "where": { id }},
        update,
        optimisticResponse: {
            deleteCartItem: {
                __typename: 'CartItem',
                id,
            }
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return result;
}