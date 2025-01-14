import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import {useUser} from "@/components/user-authentication/hooks/useUser";

export const USER_ORDERS_QUERY = gql`
  query Orders($where: OrderWhereInput!) {
  orders(where: $where) {
    id
    orderNumber
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity      
      }
  }
}
`;

export const useOrders = () => {
    const user = useUser();

    const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
        variables: {
            "where": {
                "user": {
                    "id": {
                        "equals": user?.id
                    }
                }
            }
        },
    });

    return { data, error, loading }
}