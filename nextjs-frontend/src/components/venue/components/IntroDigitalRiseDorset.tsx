import React from "react";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {ImageResponsive} from "@/components/venue/components/Intro/ImageResponsive";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Feedback} from "@/components/global/components/Feedback";

const IntroDigitalRiseDorset: React.FC = () => {
    const config = useConfig()

    return (
        <IntroStyle>
            <div className="content">
                <h2>Digital Rise Dorset Schedule</h2>
                <Feedback />
                <p className="general">Welcome to Herve's schedule system</p>
                <p className="ethos">Book him for an business meeting or a casual discussion
                </p>
            </div>
            <div className="illustration">
                <ImageResponsive image={config.intro}/>
            </div>
        </IntroStyle>
    )
}

export default IntroDigitalRiseDorset