import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {EventHost} from "@/components/event/types/event";

const HAIRDRESSER_QUERY = gql`
    query EventHosts {
      eventHosts {
        id
        name
        eventTypes {
            id
        }
      }
    }
`;

export const useEventHosts = () => {
    const eventHostData = useQuery(HAIRDRESSER_QUERY, {
        variables: {},
        fetchPolicy: "cache-and-network"
    });

    return eventHostData
}

export const getEventHostDetail = (eventHosts: EventHost[], eventHostId: string) => {
    const result = eventHosts.filter((eventHost: EventHost) => eventHost.id === eventHostId)
    return result[0]
}