import { gql, useQuery } from '@apollo/client';
import {KeystoneCartItem} from "@/pages/event/types/event";

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
          price
          haircut {
            name
          }
          shampoo
          event {
            id
            day
            startTime              
            hairdresser {
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
    cartItems: KeystoneCartItem[]
}

export function useUser(): UserInformation | null {
  const { data } = useQuery(CURRENT_USER_QUERY, {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only'
  });

  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
