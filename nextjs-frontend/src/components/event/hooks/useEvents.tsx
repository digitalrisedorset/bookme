import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/components/event/hooks/useFilter";
import {useEffect} from "react";

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
    const { data, loading, error, refetch } = useQuery(EVENTS_QUERY, {
        variables: {
            where: filter,
            orderBy: [{ startTime: "asc" }],
        },
        fetchPolicy: "network-only", // Ensures fresh data from the server
        skip: !filter, // Avoids running query if filter is undefined
    });

    useEffect(() => {
        if (filter) {
            refetch();
        }
    }, [filter, refetch]); // Triggers refetch when filter changes

    return { data, loading, error };
}