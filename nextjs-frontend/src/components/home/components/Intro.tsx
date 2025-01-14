import React from "react";
import Image from "next/image";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {useVenueConfigState} from "@/state/VenueConfigState";

const Intro: React.FC = () => {
    const {config} = useVenueConfigState()

    return (
        <IntroStyle>
            <div className="content">
                <h2>{config.intro.heading}</h2>
                <p className="general">{config.intro.general}</p>
                <p className="ethos">{config.intro.ethos}</p>
            </div>
            <div className="illustration">
                <Image className="logo" src={`/images/${config.intro.img.src}`} width={config.intro.img.width} height={config.intro.img.height} alt="Rachelle's Hairdresser freelancing"/>
            </div>
        </IntroStyle>
    )
}

export default Intro