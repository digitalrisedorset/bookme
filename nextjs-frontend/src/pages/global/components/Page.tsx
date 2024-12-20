import React from "react";
import {GlobalStyles} from "@/pages/global/styles/Global";
import {MainStyles} from "@/pages/global/styles/MainStyles";
import Header from "@/pages/global/components/Header";
import {Nav} from "@/pages/global/components/Nav";
import {Cart} from "@/pages/event/components/Cart";
import Footer from "@/pages/global/components/Footer";

interface PageProps {
    children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }: PageProps) => {
    return (
        <div>
            <GlobalStyles />
            <MainStyles>
                <Header />
                <Nav />
                <Cart />
                {children}
                <Footer />
            </MainStyles>
        </div>
    )
}

export default Page