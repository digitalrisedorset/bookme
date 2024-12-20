import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const EVENT_TYPE_QUERY = gql`
    query EventTypes {
      eventTypes {
        name
      }
    }
`;

export const useEventTypes = () => {
    const eventTypesData = useQuery(EVENT_TYPE_QUERY, {
        variables: {},
        fetchPolicy: 'no-cache'
    });

    return eventTypesData
}