import Link from "next/link"
import {useRouter} from "next/router";
import Image from "next/image";
import React from "react";
import HeaderStyles from "@/components/global/styles/Header";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useConfig} from "@/components/venue/hooks/useConfig";

const Header: React.FC = () => {
    const router = useRouter()
    const config = useConfig()
    const user = useUser()

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault(); // stop the form from submitting
        if (user?.role?.isEventHost) {
            router.push({pathname: `/schedule`});
        } else {
            router.push({pathname: `/`});
        }
    }

    return (
        <HeaderStyles colors={config?.themeColors}>
            <Link href="#" onClick={handleClick}>
                <Image className="logo" src={`/images/${config?.logo}`} width="80" height="77" alt=""/>
            </Link>
        </HeaderStyles>)
    ;
}

export default Header;