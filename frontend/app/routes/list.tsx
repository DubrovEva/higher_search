import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/list.css?url";
import {
    Container, Divider,
    Header,
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {CustomFooter} from "~/components/footer";
import {OrgCards} from "~/components/studorg";
import {FixedMenu} from "~/components/menu";
import Client from "~/client";
import {Studorg} from "~/proto/models/studorg";

export const meta: MetaFunction = () => {
    return [
        {title: "Список организаций"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function Body() {
    const [studorgs, setStudorgInfo] = useState<Studorg[] | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().getAllStudorgs().then(x => setStudorgInfo(x))
    }, [])

    return (
        <Container text className="main">
            <Header size={"huge"}> Все организации </Header>
            <Divider/>
            {studorgs ? <OrgCards studorgs={studorgs}/> : <span>Loading...</span>}
        </Container>
    );
}

export default function List() {
    return (
        <>
            <FixedMenu/>
            <Body/>
            <CustomFooter/>
        </>
    );
}
