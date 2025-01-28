export interface graphQLVariables {
    [k: string]: string | {"connect": { "id": string} } | {"disconnect": boolean }
}