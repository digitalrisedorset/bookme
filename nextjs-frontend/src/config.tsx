export interface ThemeColors {
    red: string,
    pastel: string,
    headerBgColour: string,
    navBgColour: string,
    buttonBg: string
    buttonColor: string
}
export interface VenuePreference {
    id?: string,
    code: string,
    route: string,
    showHairdresserOnEvent: boolean,
    scheduleWeekSpan: number,
    offerShampoo: boolean,
    logo: string,
    intro: {
        img: {
            src: string,
            width: number,
            height: number,
        }
    },
    order: {
        img: {
            src: string,
            width: number,
            height: number,
        }
    }
    themeColors: ThemeColors
}

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
    },
    venuePreference: {
        defaultVenue: string,
        blushharry: VenuePreference,
        rachelle: VenuePreference
        paddington: VenuePreference
    }
}

export const config: configInfo = {
    keystone: {
        graphqlEndpoint: (process.env.NEXT_PUBLIC_KEYSTONE_HOST === undefined) ? 'https://bookme-keystone.digitalrisedorset.co.uk/api/graphql' : `${process.env.NEXT_PUBLIC_KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    },
    stripe: {
        public_key: 'pk_test_51PITSKRqZ4IliSNkzwsUtTnaHqBPaiUH2TtWE8kxK5w1LMiGO5kis8pPwf2Y4zgse2fTXLaIoRFApsNBQZhnkeOD00fjiL9r5a',
        currency: (process.env.NEXT_PUBLIC_CURRENCY === undefined)? 'GBP':process.env.NEXT_PUBLIC_CURRENCY,
        locale: (process.env.NEXT_PUBLIC_LOCALE === undefined)? 'en-gb':process.env.NEXT_PUBLIC_LOCALE
    },
    eventlisting: {
        perPage: 20
    },
    venuePreference: {
        defaultVenue: 'paddington-hairdressing',
        blushharry: {
            code: 'blush-harry',
            route: 'blushharry',
            showHairdresserOnEvent: false,
            scheduleWeekSpan: 4,
            offerShampoo: false,
            logo: 'book-harry.png',
            intro: {
                img: {
                    src: 'harry-barber.png',
                    width: 732,
                    height: 277,
                }
            },
            order: {
                img: {
                    src: 'orderplaceholder-harry.jpg',
                    width: 378,
                    height: 378,
                }
            },
            themeColors: {
                red: '#ED2532',
                pastel: '#273969',
                headerBgColour: 'lightgrey',
                navBgColour: 'pastel',
                buttonBg: 'mediumgrey',
                buttonColor: 'white'
            }
        },
        rachelle: {
            code: 'rachelle-hairdressing',
            route: 'rachelle',
            showHairdresserOnEvent: true,
            scheduleWeekSpan: 14,
            offerShampoo: true,
            logo: 'book-purple.png',
            intro: {
                img: {
                    src: 'freelance-hairddresser.jpg',
                    width: 750,
                    height: 300,
                }
            },
            order: {
                img: {
                    src: 'orderplaceholder1.jpg',
                    width: 378,
                    height: 378,
                }
            },
            themeColors: {
                red: '#333252',
                pastel: '#C3B5D1',
                headerBgColour: 'darkgrey',
                navBgColour: 'lightgrey',
                buttonBg: 'mediumgrey',
                buttonColor: 'mediumgrey'
            }
        },
        paddington: {
            code: 'paddington-hairdressing',
            route: 'paddington',
            showHairdresserOnEvent: true,
            scheduleWeekSpan: 14,
            offerShampoo: true,
            logo: 'book3.png',
            intro: {
                img: {
                    src: 'miaddison.jpg',
                    width: 732,
                    height: 277,
                }
            },
            order: {
                img: {
                    src: 'orderplaceholder-paddington.jpg',
                    width: 540,
                    height: 960,
                }
            },
            themeColors: {
                red: '#f77f00',
                pastel: '#C3B5D1',
                headerBgColour: 'mediumgrey',
                navBgColour: 'green',
                buttonBg: 'mediumgrey',
                buttonColor: 'mediumgrey'
            }
        }
    }
}
