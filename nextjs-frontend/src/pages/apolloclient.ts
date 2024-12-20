import {ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import {config} from "./config";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

console.log('graphqlEndpoint', config.keystone.graphqlEndpoint)

const keystone = ApolloLink.from([
    // this uses apollo-link-http under the hood, so all the options here come from that package
    createUploadLink({
        uri: config.keystone.graphqlEndpoint,
        credentials: 'include',
        headers: {
            'apollo-require-preflight': 'true'
        }
    }),
]);

export const apolloClient = new ApolloClient({
    link: keystone,
    cache: new InMemoryCache()
});

apolloClient.clearStore();
