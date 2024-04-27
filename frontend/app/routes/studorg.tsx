import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/studorg.css?url";
import {Container, Header, SidebarPusher} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {StudorgInfo} from "~/proto/models/studorg";
import {FixedMenu} from "~/components/menu";
import Client from "~/client";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function PageContent(params: { studorgInfo: StudorgInfo }) {
    return (
        <Container text className={"main"}>
            <Header size="huge"> {params.studorgInfo.name}</Header>
            <p> {params.studorgInfo.description}</p>
        </Container>
    );
}

export default function Studorg() {
    const [studorgInfo, setStudorgInfo] = useState<StudorgInfo | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().getStudorgInfo().then(x => setStudorgInfo(x))
    }, [])

    return (
        <>
            <SidebarPusher>
                <FixedMenu/>
                {
                    studorgInfo
                    ? <PageContent studorgInfo={studorgInfo} />
                    : <span>Loading...</span>
                }
            </SidebarPusher>

        </>
    );
}
