import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useScheduleFilter} from "@/components/event/hooks/useScheduleFilter";

const EVENTS_QUERY = gql`
    query Events($orderBy: [EventOrderByInput!]!, $where: EventWhereInput!, $skip: Int = 0, $take: Int) {
      events(orderBy: $orderBy, where: $where, skip: $skip, take: $take) {
        id      
        startTime
        status
        endTime   
        day
        orderItem {
          order {
            user {
              name
            }
          }
        }
      }
    }
`;

export const useSchedule = () => {
    const filter = useScheduleFilter()

    const eventData = useQuery(EVENTS_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"startTime": "asc"}],
        }
    });

    return eventData
}