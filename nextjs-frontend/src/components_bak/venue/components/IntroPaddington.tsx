import React from "react";
import Image from "next/image";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {useConfig} from "@/components/venue/hooks/useConfig";

const IntroPaddington: React.FC = () => {
    const config = useConfig()

    return (
        <IntroStyle>
            <div className="content">
                <h2>Booking System for the Paddington Hairdressing Salon</h2>
                <p className="general">Select when and which hairdresser you want for your appointment.
                    We bring our schedule for you to book in just over 3 clicks</p>
                <p className="ethos">Whether you are aiming to get a straight cut with hassle free booking or a very generous time at your preferred place to get your hair done and a pampering time for your head to feel fully refreshed!,
                    we are committed to deliver the best hairdressing experience you are looking for.
                </p>
            </div>
            <div className="illustration">
                <Image className="logo" src={`/images/${config.intro.img.src}`} width={config.intro.img.width} height={config.intro.img.height} alt="Rachelle's Hairdresser freelancing"/>
            </div>
        </IntroStyle>
    )
}

export default IntroPaddington