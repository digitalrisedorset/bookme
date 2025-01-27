import {InMemoryCache} from "@apollo/client";

export const clearApolloCache = (cache: InMemoryCache, id: string) => {
    const cacheKey = cache.identify(id);
    if (cacheKey) {
        cache.evict(cacheKey);
        console.log(`Cache evicted for key: ${cacheKey}`);
    } else {
        console.warn("Cache key could not be identified with id:", id);
    }
}