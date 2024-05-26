import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import {
    Container,
    Header,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {AuthInfo} from "~/proto/models/user";
import Client from "~/client";

export const meta: MetaFunction = () => {
    return [
        {title: "Контакты"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

export default function Contacts() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}  >
                <Header size={"huge"}> Контакты </Header>
            </Container>

            <CustomFooter/>
        </>
    );
}
