import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const EVENTS_QUERY = gql`
    query Events($where: EventWhereInput!) {
      events(where: $where) {
        id      
        startTime
        venue {
          name
        }
        status
        endTime       
        hairdresser {
          id
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

export const useEventGroup = (eventIds: string[]) => {
    const eventData = useQuery(EVENTS_QUERY, {
        variables: {
            "where": { id: {in: eventIds} },
        }
    });

    return eventData
}