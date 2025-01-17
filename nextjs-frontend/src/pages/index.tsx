import IntroRachelle from "@/components/venue/components/IntroRachelle";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {useRouter} from "next/router";

export default function Home() {
    const config = useConfig()
    const router = useRouter()

    router.push({pathname: config.route?? 'paddington'})

    return (
       <IntroRachelle />
    );
}
