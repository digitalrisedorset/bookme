
export type configInfo = {
    keystone: {
        graphqlEndpoint: string,
        headers: {
            'apollo-require-preflight': string
        }
    }
}

export const config: configInfo = {
    keystone: {
        graphqlEndpoint: (process.env.NEXT_PUBLIC_KEYSTONE_HOST === undefined) ? 'https://bookme-keystone.digitalrisedorset.co.uk/api/graphql' : `${process.env.NEXT_PUBLIC_KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    }
}
