import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/components/event/hooks/useFilter";

export const EVENTS_QUERY = gql`
    query Events($orderBy: [EventOrderByInput!]!, $where: EventWhereInput!, $skip: Int = 0, $take: Int) {
      events(orderBy: $orderBy, where: $where, skip: $skip, take: $take) {
        id      
        startTime
        venue {
          name
        }
        status
        endTime       
        eventHost {
          id
          name
        }
        day
        orderItem {
          event {
            id
          }
        }
      }
    }
`;

export const useEvents = () => {
    const filter = useFilter()

    /**
     * {
     *                 "eventType": {
     *                     "name": {
     *                         "equals": activeEventType
     *                     }
     *                 },
     *                 "day": {
     *                     "equals": activeDay
     *                 },
     *                 "eventHost": {
     *                     "name": {
     *                         "equals": activeEventHost
     *                     }
     *                 }
     *             }
     */
    const eventData = useQuery(EVENTS_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"startTime": "asc"}],
        }
    });

    return eventData
}