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
    showEventHostOnEvent: boolean,
    timeBase: 'week' | 'day',
    scheduleWeekSpan: number,
    offerShampoo: boolean,
    logo: string,
    showPrice: boolean,
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
        secret_key: string,
        public_key: string,
        currency: string,
        locale: string
    },
    eventlisting: {
        perPage: number
    },
    venuePreference: {
        defaultVenue: string,
        blushharry: VenuePreference
        rachelle: VenuePreference
        paddington: VenuePreference
        doggiemadhouse: VenuePreference
        poolerugby: VenuePreference
        datemate: VenuePreference
        digitalrisedorset: VenuePreference
        qichen: VenuePreference
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
        secret_key: 'sk_test_51PITSKRqZ4IliSNkAocVG9f9K8cCecrEEqJfdmFg3wzgjYN4F5JgidjcNo8JAZXpyLA0s3yRswWBen4l6anyKgzi008oZfNt8K',
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
            showEventHostOnEvent: false,
            timeBase: 'week',
            scheduleWeekSpan: 4,
            offerShampoo: false,
            logo: 'book-harry.png',
            showPrice: true,
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
            showEventHostOnEvent: false,
            timeBase: 'week',
            scheduleWeekSpan: 14,
            offerShampoo: false,
            logo: 'book-doggie.png',
            showPrice: true,
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
        poolerugby: {
            code: 'poole-rugby',
            route: 'poolerugby',
            showEventHostOnEvent: false,
            timeBase: 'week',
            scheduleWeekSpan: 14,
            offerShampoo: false,
            logo: 'book-poolerugby.png',
            showPrice: false,
            intro: {
                img: {
                    src: 'homeintro-poolerugby.png',
                    width: 375,
                    height: 150,
                },
                largeImg: {
                    src: 'homeintro-poolerugby.png',
                    width: 750,
                    height: 300,
                },
                alt: 'Poole Rugby'
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
                red: '#9dcd5a',
                pastel: '#a6a6a6',
                headerBgColour: 'lightgrey',
                navBgColour: 'pastel',
                buttonBg: 'mediumgrey',
                buttonColor: 'white'
            }
        },
        datemate: {
            code: 'date-mate',
            route: 'datemate',
            showEventHostOnEvent: false,
            timeBase: 'day',
            scheduleWeekSpan: 2,
            offerShampoo: false,
            logo: 'date-mate-logo.png',
            showPrice: false,
            intro: {
                img: {
                    src: 'date-mate-intro.png',
                    width: 375,
                    height: 150,
                },
                largeImg: {
                    src: 'date-mate-intro-large.png',
                    width: 750,
                    height: 300,
                },
                alt: 'Date Mate Ready to make your Valentine Day more fun'
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
                red: '#FF4F8B',
                pastel: '#99507F',
                headerBgColour: 'lightgrey',
                navBgColour: 'pastel',
                buttonBg: 'mediumgrey',
                buttonColor: 'white'
            }
        },
        digitalrisedorset: {
            code: 'digital-rise-dorset',
            route: 'digitalrisedorset',
            showEventHostOnEvent: false,
            timeBase: 'day',
            scheduleWeekSpan: 4,
            offerShampoo: false,
            logo: 'drd-logo.png',
            showPrice: false,
            intro: {
                img: {
                    src: 'digitalrisedorset-intro.png',
                    width: 375,
                    height: 150,
                },
                largeImg: {
                    src: 'digitalrisedorset-intro-large.png',
                    width: 750,
                    height: 300,
                },
                alt: 'Digital Rise Dorset Office in Dorset'
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
                red: '#D29979',
                pastel: '#8ed1fc',
                headerBgColour: 'lightgrey',
                navBgColour: 'pastel',
                buttonBg: 'mediumgrey',
                buttonColor: 'white'
            }
        },
        qichen: {
            code: 'qichen-restaurant',
            route: 'qichen',
            showEventHostOnEvent: true,
            timeBase: 'week',
            scheduleWeekSpan: 2,
            offerShampoo: false,
            logo: 'qichen-logo.png',
            showPrice: true,
            intro: {
                img: {
                    src: 'gallery-10-300x200.jpg',
                    width: 300,
                    height: 200,
                },
                largeImg: {
                    src: 'header-banner-image.jpg',
                    width: 660,
                    height: 320,
                },
                alt: 'Eating with joy'
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
                red: '#DF3F00',
                pastel: 'var(--lightgrey)',
                headerBgColour: 'lightgrey',
                navBgColour: 'lightgrey',
                buttonBg: 'mediumgrey',
                buttonColor: 'mediumgrey'
            }
        },
        rachelle: {
            code: 'rachelle-hairdressing',
            route: 'rachelle',
            showEventHostOnEvent: true,
            timeBase: 'week',
            scheduleWeekSpan: 14,
            offerShampoo: true,
            logo: 'book-purple.png',
            showPrice: true,
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
            showEventHostOnEvent: true,
            timeBase: 'week',
            scheduleWeekSpan: 14,
            offerShampoo: true,
            logo: 'book3.png',
            showPrice: true,
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
