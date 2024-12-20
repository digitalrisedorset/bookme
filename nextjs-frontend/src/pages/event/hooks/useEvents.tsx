import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {config} from "@/pages/config";
import {useFilter} from "@/pages/event/hooks/useFilter";

const EVENTS_QUERY = gql`
    query Events($orderBy: [EventOrderByInput!]!, $where: EventWhereInput!, $skip: Int = 0, $take: Int) {
      events(orderBy: $orderBy, where: $where, skip: $skip, take: $take) {
        id
        maximumAttendees
        registeredAttendees
        startTime
        venue {
          name
        }
        status
        endTime
        eventType {
          name
        }
        day
      }
    }
`;

export const useEvents = (page: number) => {
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
     *                 "venue": {
     *                     "name": {
     *                         "equals": activeVenue
     *                     }
     *                 }
     *             }
     */
    const eventData = useQuery(EVENTS_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"startTime": "asc"}],
            "skip": (page - 1) * config.eventlisting.perPage,
            "take": config.eventlisting.perPage,
        }
    });

    return eventData
}