import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {KeystoneEvent} from "@/components/event/types/event";

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
        hairdresser {
          name
          haircutTypes {
            id
            name
          }
        }
        day
      }
    }
`;

export const useEvent = (eventId: string): KeystoneEvent => {
    const eventData = useQuery(EVENT_QUERY, {
        variables: {
            "where": { id: eventId },
        }
    });

    return eventData
}