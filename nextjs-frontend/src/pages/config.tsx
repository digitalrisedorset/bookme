
export type configInfo = {
    keystone: {
        graphqlEndpoint: string,
        headers: {
            'apollo-require-preflight': string
        }
    },
    stripe: {
        public_key: string,
        currency: string,
        locale: string
    },
    eventlisting: {
        perPage: number
    }
}

export const config: configInfo = {
    keystone: {
        graphqlEndpoint: (process.env.REACT_APP_KEYSTONE_HOST === undefined) ? 'http://localhost:3000/api/graphql' : `${process.env.REACT_APP_KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    },
    stripe: {
        public_key: 'pk_test_51PITSKRqZ4IliSNkzwsUtTnaHqBPaiUH2TtWE8kxK5w1LMiGO5kis8pPwf2Y4zgse2fTXLaIoRFApsNBQZhnkeOD00fjiL9r5a',
        currency: process.env.NEXT_PUBLIC_CURRENCY,
        locale: process.env.NEXT_PUBLIC_LOCALE
    },
    eventlisting: {
        perPage: 20
    }
}
