import type { AppProps } from "next/app";
import Page from "./global/components/Page";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './apolloclient'
import StateProvider from "@/state/StateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={apolloClient}>
          <StateProvider>
              <Page>
                <Component {...pageProps} />
              </Page>
          </StateProvider>
        </ApolloProvider>
}
