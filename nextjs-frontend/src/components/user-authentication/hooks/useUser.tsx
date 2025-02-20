import { gql, useQuery } from '@apollo/client';
import {EventType, EventTypeGroup, EventHost, KeystoneCartItem} from "@/components/event/types/event";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name  
        eventHost {
          id
          name
        }
        eventType {
          id
          name
        }
        eventTypeGroup {
          id
          name
        }
        weekPreference
        cartItems {
          id
          quantity   
          price
          eventType {
            name
          }
          shampoo
          event {
            id
            day
            startTime 
            endTime             
            eventHost {
              id            
              name
            }                       
          }      
        }  
        role {
          isEventHost
        }           
      }
    }
  }
`;

export interface UserInformation {
    id: string
    email: string
    name: string
    eventType?: EventType
    eventHost?: Pick<EventHost, 'id'>
    weekPreference: string
    cartItems: KeystoneCartItem[]
    eventTypeGroup: EventTypeGroup
    role: {
        isEventHost: boolean
    }
}

export function useUser(): UserInformation | undefined {
  const { data } = useQuery(CURRENT_USER_QUERY, {
      nextFetchPolicy: 'network-only',
      fetchPolicy: 'network-only'
  });

  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
