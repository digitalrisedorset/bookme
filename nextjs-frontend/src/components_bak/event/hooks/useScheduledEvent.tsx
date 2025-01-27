import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const EVENT_QUERY = gql`
    query Event($where: EventWhereUniqueInput!) {
      event(where: $where) {
        day
        endTime
        startTime
        hairdresser {
          name
        }
        orderItem {
          name
          price         
          order {
            user {
              name
            }
            orderReference
          }         
        }
        user {
          name
        }
      }
    }
`;

export const useSheduledEvent = (eventId: string) => {
    const eventData = useQuery(EVENT_QUERY, {
        variables: {
            "where": { id: eventId },
        }
    });

    return eventData
}