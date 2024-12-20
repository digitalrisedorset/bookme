import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "@/pages/user-authentication/hooks/useUser";

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(eventId: $id) {
      id
    }
  }
`;

export const useAddToCart = (id: string) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { id },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return [addToCart, { loading }];
}