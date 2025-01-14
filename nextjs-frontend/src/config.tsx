export interface ThemeColors {
    red: string,
    pastel: string,
    headerBgColour: string,
    navBgColour: string,
    buttonBg: string
    buttonColor: string
}
export interface VenuePreference {
    id: string,
    code: string,
    active: boolean,
    scheduleWeekSpan: number,
    offerShampoo: boolean,
    logo: string,
    intro: {
        heading: string,
        general: string,
        ethos: string,
        img: {
            src: string,
            width: number,
            height: number,
        }
    },
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
        flashHarry: VenuePreference,
        rachelle: VenuePreference
        maddison: VenuePreference
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
        flashHarry: {
            id: '30d125ca-e52c-47ff-b7c4-01b0a5e99542',
            code: 'flash_harry',
            active: true,
            scheduleWeekSpan: 4,
            offerShampoo: false,
            logo: 'book-harry.png',
            intro: {
                heading: "Booking System for Flash Harry's Barber Salon",
                general: 'Select when and which time you want for your appointment. We bring our schedule for you to book in just over 3 clicks',
                ethos: 'Whether you are aiming to get a straight cut with hassle free booking or a designed blade workout, we are committed to deliver the best hairdressing experience you are looking for.',
                img: {
                    src: 'harry-barber.png',
                    width: 732,
                    height: 277,
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
            id: '79a1bc9b-8fb3-4a40-a82a-7802ff542a69',
            code: 'rachelle_bournemouth',
            active: false,
            scheduleWeekSpan: 14,
            offerShampoo: true,
            logo: 'book-purple.png',
            intro: {
                heading: "Booking System for Rachelle's Hairdressing Salon",
                general: 'Select when and which hairdresser you want for your appointment. We bring our schedule for you to book in just over 3 clicks',
                ethos: 'Whether you are aiming to get a straight cut with hassle free booking or a very generous time at your preferred place to get your hair done and a pampering time for your head to feel fully refreshed!,\n' +
                    '                    we are committed to deliver the best hairdressing experience you are looking for.',
                img: {
                    src: 'freelance-hairddresser.jpg',
                    width: 750,
                    height: 300,
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
        maddison: {
            code: 'maddison',
            scheduleWeekSpan: 14,
            offerShampoo: true,
            logo: 'book-purple.png',
            intro: {
                img: {
                    src: 'harry-barber.png',
                    width: 750,
                    height: 300,
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
        }
    }
}
