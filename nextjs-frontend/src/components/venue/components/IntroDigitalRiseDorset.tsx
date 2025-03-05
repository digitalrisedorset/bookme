import React from "react";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {ImageResponsive} from "@/components/venue/components/Intro/ImageResponsive";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Feedback} from "@/components/global/components/Feedback";
import Link from "next/link";
import {CalendarStyles} from "@/components/global/styles/NavStyles";

const IntroDigitalRiseDorset: React.FC = () => {
    const config = useConfig()

    return (
        <IntroStyle>
            <div className="content">
                <h2>Digital Rise Dorset Schedule</h2>
                <Feedback />
                <p className="general">Welcome to Herve&rsquo;s Calendar</p>
                <CalendarStyles>
                    <Link href="/events">Check my Availability</Link>
                </CalendarStyles>
                <p className="ethos">Book me for a business meeting or a casual discussion
                </p>
            </div>
            <div className="illustration">
                <ImageResponsive image={config.intro}/>
            </div>
        </IntroStyle>
    )
}

export default IntroDigitalRiseDorset