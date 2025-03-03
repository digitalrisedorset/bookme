import IntroRachelle from "@/components/venue/components/IntroRachelle";
import {useConfig} from "@/components/venue/hooks/useConfig";
import IntroPaddington from "@/components/venue/components/IntroPaddington";
import IntroBlushHarry from "@/components/venue/components/IntroBlushHarry";
import IntroDoggieMadhouse from "@/components/venue/components/IntroDoggieMadhouse";
import IntroDateMate from "@/components/venue/components/IntroDateMate";
import IntroPooleRugby from "@/components/venue/components/IntroPooleRugby";
import IntroDigitalRiseDorset from "@/components/venue/components/IntroDigitalRiseDorset";
import Link from "next/link";
import {CalendarStyles} from "@/components/global/styles/NavStyles";

export default function Home() {
    const config = useConfig()

    return (
        <>
            {config.route === 'rachelle' &&<IntroRachelle />}
            {config.route === 'poolerugby' &&<IntroPooleRugby />}
            {config.route === 'paddington' &&<IntroPaddington />}
            {config.route === 'blushharry' &&<IntroBlushHarry />}
            {config.route === 'doggiemadhouse' &&<IntroDoggieMadhouse />}
            {config.route === 'datemate' &&<IntroDateMate />}
            {config.route === 'digitalrisedorset' &&<IntroDigitalRiseDorset />}
            <CalendarStyles>
                <Link href="/events">View Availability</Link>
            </CalendarStyles>
        </>
    );
}
