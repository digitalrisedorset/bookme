import React from "react";
import Image from "next/image";
import {IntroStyle} from "@/components/home/styles/HomeStyles";
import {useConfig} from "@/components/venue/hooks/useConfig";

const IntroRachelle: React.FC = () => {
    const config = useConfig()

    return (
        <IntroStyle>
            <div className="content">
                <h2>Booking System for Rachelle&apos;s Hairdressing Salon</h2>
                <p className="general">Select when and which hairdresser you want for your appointment.
                    We bring our schedule for you to book in just over 3 clicks
                </p>
                <p className="ethos">Whether you are wanting a simple dry cut with hassle free booking
                    or a full head of extensions
                    we are committed to deliver the best hairdressing experience you could wish for.
                </p>
            </div>
            <div className="illustration">
                {/*<Image className="logo" src={`/images/${config?.intro?.img?.src}`} width={config?.intro?.img?.width} height={config?.intro?.img?.height} alt="Rachelle's Hairdresser freelancing"/>*/}
            </div>
        </IntroStyle>
    )
}

export default IntroRachelle