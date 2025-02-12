import {useRouter} from "next/router";
import React from "react";
import {sanitiseString} from "@/lib/string";
import {Section} from "@/components/global/styles/MainStyles";
import {ResetPassword} from "@/components/user-authentication/components/ResetPassword";

export default function Reset() {
    const router = useRouter();

    const token = sanitiseString(router.query.token);

    if (!token) return

    return (
        <Section>
            <ResetPassword token={token} />
        </Section>
    )
}
