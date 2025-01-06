import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/pages/event/hooks/useFilter";

const EVENTS_QUERY = gql`
    query Events($orderBy: [EventOrderByInput!]!, $where: EventWhereInput!, $skip: Int = 0, $take: Int) {
      events(orderBy: $orderBy, where: $where, skip: $skip, take: $take) {
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
        }
        orderItem {
            id
            name
        }
        day
      }
    }
`;

export const useEvents = () => {
    const filter = useFilter()

    /**
     * {
     *                 "haircutType": {
     *                     "name": {
     *                         "equals": activeHaircutType
     *                     }
     *                 },
     *                 "day": {
     *                     "equals": activeDay
     *                 },
     *                 "hairdresser": {
     *                     "name": {
     *                         "equals": activeHairdresser
     *                     }
     *                 }
     *             }
     */
    const eventData = useQuery(EVENTS_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"startTime": "asc"}],
            "take": 500
        }
    });

    return eventData
}