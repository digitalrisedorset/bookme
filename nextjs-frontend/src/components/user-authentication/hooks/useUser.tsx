import { gql, useQuery } from '@apollo/client';
import {KeystoneCartItem} from "@/components/event/types/event";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name  
        hairdresser {
          id
          name
        }
        haircutType {
          id
          name
        }
        haircutTypeGroup {
          id
          name
        }
        weekPreference
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
            endTime             
            hairdresser {
              id            
              name
            }                       
          }      
        }             
      }
    }
  }
`;

export interface UserInformation {
    id: string
    email: string
    name: string
    cartItems: KeystoneCartItem[]
    haircutTypeGroup: any
}

export function useUser(): UserInformation | null {
  const { data } = useQuery(CURRENT_USER_QUERY, {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only'
  });

  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
