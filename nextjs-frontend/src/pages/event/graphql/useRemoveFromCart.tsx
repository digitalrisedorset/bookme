import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "@/pages/user-authentication/hooks/useUser";

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation DeleteCartItem($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      id
    }
  }
`;

export const useRemoveFromCart = (id: string): [() => void, {loading: boolean}] => {
    const update = (cache, payload) => {
        cache.evict(cache.identify(payload.data.deleteCartItem));
    }

    const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
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

    return [removeFromCart, { loading }];
}