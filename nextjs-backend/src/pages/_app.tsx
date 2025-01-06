import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './apolloclient'
import Page from "@/pages/global/components/Page";
import StateProvider from "@/state/StateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={apolloClient}>
    <StateProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </StateProvider>
  </ApolloProvider>;
}
