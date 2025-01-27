import {CURRENT_USER_QUERY} from "@/components/user-authentication/hooks/useUser";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {USER_ORDERS_QUERY} from "@/components/order/graphql/useOrders";

export const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

export const useCheckout = () => {
    const [checkout, { error: graphQLError }] = useMutation(
        CREATE_ORDER_MUTATION,
        {
            refetchQueries: [{ query: CURRENT_USER_QUERY},{ query: USER_ORDERS_QUERY }],
        }
    );

    return [checkout, { error: graphQLError }]
}

