import IntroRachelle from "@/components/venue/components/IntroRachelle";
import {useConfig} from "@/components/venue/hooks/useConfig";
import IntroPaddington from "@/components/venue/components/IntroPaddington";
import IntroBlushHarry from "@/components/venue/components/IntroBlushHarry";
import IntroDoggieMadhouse from "@/components/venue/components/IntroDoggieMadhouse";
import IntroDateMate from "@/components/venue/components/IntroDateMate";
import IntroPooleRugby from "@/components/venue/components/IntroPooleRugby";
import IntroDigitalRiseDorset from "@/components/venue/components/IntroDigitalRiseDorset";
import {Loading} from "@/components/global/components/Loading";
import IntroQichen from "@/components/venue/components/IntroQichen";

export default function Home() {
    const config = useConfig()

    if (config === undefined) return <Loading />

    return (
        <>
            {config.route === 'rachelle' &&<IntroRachelle />}
            {config.route === 'poolerugby' &&<IntroPooleRugby />}
            {config.route === 'paddington' &&<IntroPaddington />}
            {config.route === 'blushharry' &&<IntroBlushHarry />}
            {config.route === 'doggiemadhouse' &&<IntroDoggieMadhouse />}
            {config.route === 'qichen' &&<IntroQichen />}
            {config.route === 'datemate' &&<IntroDateMate />}
            {config.route === 'digitalrisedorset' &&<IntroDigitalRiseDorset />}
        </>
    );
}