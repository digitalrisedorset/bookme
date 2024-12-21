import { gql, useQuery } from '@apollo/client';
import {CartItem} from "@/pages/event/types/event";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name    
        cartItems {
          id
          quantity   
          event {
            id
            price
            venue {
                name
            }
            eventType {
                name
            }
          }      
        }             
      }
    }
  }
`;

interface UserInformation {
    id: string
    email: string
    name: string
    cartItems: CartItem[]
}

export function useUser(): UserInformation | null {
  const { data } = useQuery(CURRENT_USER_QUERY, {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only'
  });

  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
