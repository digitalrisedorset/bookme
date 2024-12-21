import React from "react";
import Image from "next/image";
import {IntroStyle} from "@/pages/home/styles/HomeStyles";

const Intro: React.FC = () => {
    return (
        <IntroStyle>
            <div className="content">
                <h4>Martial Arts for Adults & Children in Bournemouth & Poole</h4>
                <p className="general">Welcome to the booking system of Dorset Karate club. </p>
                <p className="ethos">Whether you are aiming to Black belt or just willing to train once a week, working on a schedule can
                    develop your skills more efficiently and can bring your karate level faster to where you want to be.</p>
            </div>
            <div className="illustration">
                <Image className="logo" src="/images/vickyandall.jpeg" width="732" height="277" alt=""/>
            </div>
        </IntroStyle>
    )
}

export default Intro