import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {config} from "@/pages/config";
import {useFilter} from "@/pages/event/hooks/useFilter";

const PAGINATION_QUERY = gql`
    query Query($where: EventWhereInput!) {
      eventsCount(where: $where)
    }
`;

export const usePagination = () => {
    const filter = useFilter()

    const { error, loading, data } = useQuery(PAGINATION_QUERY, {
        variables: { "where": filter}
    });

    const count = data?.eventsCount;
    const pageCount = Math.ceil(count / config.eventlisting.perPage);

    return {pageCount, count, error, loading}
}