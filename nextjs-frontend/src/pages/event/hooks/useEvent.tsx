import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {config} from "@/pages/config";
import {useFilter} from "@/pages/event/hooks/useFilter";
import {useEventState} from "@/state/EventState";

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

export const useEvent = (eventId: string) => {
    const eventData = useQuery(EVENT_QUERY, {
        variables: {
            "where": { id: eventId },
        }
    });

    return eventData
}