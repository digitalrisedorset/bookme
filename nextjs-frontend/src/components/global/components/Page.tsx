import React, {useEffect, useState} from "react";
import {GlobalStyles} from "@/components/global/styles/Global";
import {MainStyles} from "@/components/global/styles/MainStyles";
import Header from "@/components/global/components/Header";
import {Nav} from "@/components/global/components/Nav";
import {Cart} from "@/components/event/components/Cart";
import Footer from "@/components/global/components/Footer";
import {useVenueConfigState} from "@/state/VenueConfigState";

interface PageProps {
    children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children, ...delegated }: PageProps) => {
    const [hasMounted, setHasMounted] = useState(false);
    const {config} = useVenueConfigState()

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
    <MainStyles {...delegated}>
        <GlobalStyles colors={config.themeColors} />
            <Header />
            <Nav />
            <Cart />
            {children}
            <Footer />
        </MainStyles>
    )
}

export default Page