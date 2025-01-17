import IntroRachelle from "@/components/venue/components/IntroRachelle";
import {useConfig} from "@/components/venue/hooks/useConfig";
import IntroPaddington from "@/components/venue/components/IntroPaddington";
import IntroBlushHarry from "@/components/venue/components/IntroBlushHarry";

export default function Home() {
    const config = useConfig()

    return (
        <>
            {config.route === 'rachelle' &&<IntroRachelle />}
            {config.route === 'paddington' &&<IntroPaddington />}
            {config.route === 'blushharry' &&<IntroBlushHarry />}
        </>
    );
}
