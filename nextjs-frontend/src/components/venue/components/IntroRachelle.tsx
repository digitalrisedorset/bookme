import React from "react";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {ImageResponsive} from "@/components/venue/components/Intro/ImageResponsive";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Feedback} from "@/components/global/components/Feedback";

const IntroRachelle: React.FC = () => {
    const config = useConfig()

    return (
        <IntroStyle>
            <div className="content">
                <h2>Booking System for Rachelle&apos;s Hairdressing Salon</h2>
                <Feedback />
                <p className="general">Select when and which eventHost you want for your appointment.
                    We bring our schedule for you to book in just over 3 clicks
                </p>
                <p className="ethos">Whether you are wanting a simple dry cut with hassle free booking
                    or a full head of extensions
                    we are committed to deliver the best hairdressing experience you could wish for.
                </p>
            </div>
            <div className="illustration">
                <ImageResponsive image={config.intro}/>
            </div>
        </IntroStyle>
    )
}

export default IntroRachelle