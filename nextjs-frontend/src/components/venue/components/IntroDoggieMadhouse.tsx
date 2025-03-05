import React from "react";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {ImageResponsive} from "@/components/venue/components/Intro/ImageResponsive";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Feedback} from "@/components/global/components/Feedback";
import Link from "next/link";
import {CalendarStyles} from "@/components/global/styles/NavStyles";

const IntroDoggieMadhouse: React.FC = () => {
    const config = useConfig()

    return (
        <IntroStyle>
            <div className="content">
                <h2>Booking System for the Doggie Madhouse</h2>
                <Feedback />
                <p className="general">Select when and which dog service you want for your special person in hour house.
                    We bring our schedule for you to book in just over 3 clicks</p>
                <CalendarStyles>
                    <Link href="/events">Check our Availability</Link>
                </CalendarStyles>
                <p className="ethos">Whether you are aiming to get a maintenance cut or a special birthday treat for your do!,
                    we are committed to deliver the best dog grooming experience you are looking for.
                </p>
            </div>
            <div className="illustration">
                <ImageResponsive image={config.intro}/>
            </div>
        </IntroStyle>
    )
}

export default IntroDoggieMadhouse