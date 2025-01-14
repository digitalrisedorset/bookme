import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const ORDER_QUERY = gql`
  query Order($where: OrderWhereUniqueInput!) {
    order(where: $where) {
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

export const useOrder = (id: string) => {
    const { data, error, loading } = useQuery(ORDER_QUERY, {
        variables: { "where": { id }},
    });

    return { data, error, loading }
}