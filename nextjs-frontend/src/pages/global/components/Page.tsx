import React, {useEffect, useState} from "react";
import {GlobalStyles} from "@/pages/global/styles/Global";
import {MainStyles} from "@/pages/global/styles/MainStyles";
import Header from "@/pages/global/components/Header";
import {Nav} from "@/pages/global/components/Nav";
import {Cart} from "@/pages/event/components/Cart";
import Footer from "@/pages/global/components/Footer";

interface PageProps {
    children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children, ...delegated }: PageProps) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
    <MainStyles {...delegated}>
        <GlobalStyles />
            <Header />
            <Nav />
            <Cart />
            {children}
            <Footer />
        </MainStyles>
    )
}

export default Page