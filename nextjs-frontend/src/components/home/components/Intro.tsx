import React from "react";
import Image from "next/image";
import {IntroStyle} from "@/components/home/styles/HomeStyles";

const Intro: React.FC = () => {
    return (
        <IntroStyle>
            <div className="content">
                <h2>Booking System for Rachelle's Hairdressing Salon</h2>
                <p className="general">Select when and which hairdresser you want for your appointment. We bring our schedule for you to book in just over 3 clicks</p>
                <p className="ethos">Whether you are aiming to get a straight cut with hassle free booking or a very generous time at your preferred place to get your hair done and a pampering time for your head to feel fully refreshed!,
                    we are committed to deliver the best hairdressing experience you are looking for.</p>
            </div>
            <div className="illustration">
                <Image className="logo" src="/images/freelance-hairddresser.jpg" width="732" height="277" alt=""/>
            </div>
        </IntroStyle>
    )
}

export default Intro