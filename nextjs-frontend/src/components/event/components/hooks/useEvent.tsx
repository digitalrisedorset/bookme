import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const EVENT_QUERY = gql`
    query Event($where: EventWhereUniqueInput!) {
      event(where: $where) {
        id      
        startTime
        venue {
          name
        }
        status
        endTime       
        eventHost {
          name
          eventTypes {
            id
            name
          }
        }
        day
      }
    }
`;

export const useEvent = (eventId: string) => {
    const eventData = useQuery(EVENT_QUERY, {
        variables: {
            "where": { id: eventId },
        }
    });

    return eventData
}