import IntroRachelle from "@/components/venue/components/IntroRachelle";
import {useConfig} from "@/components/venue/hooks/useConfig";
import IntroPaddington from "@/components/venue/components/IntroPaddington";
import IntroBlushHarry from "@/components/venue/components/IntroBlushHarry";
import IntroDoggieMadhouse from "@/components/venue/components/IntroDoggieMadhouse";
import IntroDateMate from "@/components/venue/components/IntroDateMate";

export default function Home() {
    const config = useConfig()

    return (
        <>
            {config.route === 'rachelle' &&<IntroRachelle />}
            {config.route === 'paddington' &&<IntroPaddington />}
            {config.route === 'blushharry' &&<IntroBlushHarry />}
            {config.route === 'doggiemadhouse' &&<IntroDoggieMadhouse />}
            {config.route === 'datemate' &&<IntroDateMate />}
        </>
    );
}
