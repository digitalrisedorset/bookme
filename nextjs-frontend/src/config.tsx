export interface ImageResponsiveType {
    img: {
        src: string,
        width: number,
        height: number,
    },
    largeImg: {
        src: string,
        width: number,
        height: number,
    },
    alt: string
}

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
    intro: ImageResponsiveType,
    order: ImageResponsiveType,
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
                },
                largeImg: {
                    src: 'harry-barber.png',
                    width: 750,
                    height: 300,
                },
                alt: 'Harry Barber'
            },
            order: {
                img: {
                    src: 'orderplaceholder-harry.jpg',
                    width: 378,
                    height: 378,
                },
                largeImg: {
                    src: 'orderplaceholder-harry.jpg',
                    width: 375,
                    height: 378,
                },
                alt: 'View your order at Harry Barber'
            },
            themeColors: {
                red: '##FFFFFF',
                pastel: '#273969',
                headerBgColour: 'lightgrey',
                navBgColour: 'pastel',
                buttonBg: 'mediumgrey',
                buttonColor: 'white'
            }
        },
        doggiemadhouse: {
            code: 'doggie-madhouse',
            route: 'doggiemadhouse',
            showHairdresserOnEvent: false,
            scheduleWeekSpan: 4,
            offerShampoo: false,
            logo: 'book-doggie.png',
            intro: {
                img: {
                    src: 'doggie-madhouse.jpg',
                    width: 375,
                    height: 150,
                },
                largeImg: {
                    src: 'doggie-madhouse.jpg',
                    width: 750,
                    height: 300,
                },
                alt: 'Harry Barber'
            },
            order: {
                img: {
                    src: 'orderplaceholder-harry.jpg',
                    width: 378,
                    height: 378,
                },
                largeImg: {
                    src: 'orderplaceholder-harry.jpg',
                    width: 375,
                    height: 378,
                },
                alt: 'View your order at Harry Barber'
            },
            themeColors: {
                red: '#d29979',
                pastel: '#33A7E1',
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
                    src: 'rachelle-beaudry-small.png',
                    width: 375,
                    height: 150,
                },
                largeImg: {
                    src: 'freelance-hairddresser.jpg',
                    width: 750,
                    height: 300,
                },
                alt: 'Rachelle'
            },
            order: {
                img: {
                    src: 'orderplaceholder1-small.jpg',
                    width: 300,
                    height: 300,
                },
                largeImg: {
                    src: 'orderplaceholder1.jpg',
                    width: 378,
                    height: 200,
                },
                alt: 'Rachelle'
            },
            themeColors: {
                red: '#9580ad',
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
                },
                largeImg: {
                    src: 'miaddison.jpg',
                    width: 750,
                    height: 300,
                },
                alt: 'Paddington'
            },
            order: {
                img: {
                    src: 'orderplaceholder-paddington.jpg',
                    width: 540,
                    height: 960,
                },
                largeImg: {
                    src: 'orderplaceholder-paddington.jpg',
                    width: 375,
                    height: 220,
                },
                alt: 'Paddington'
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
