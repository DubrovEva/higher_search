import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/list.css?url";
import my_logo from "../assets/logo.png?url";
import dummy from "../assets/dummy.png?url";
import {
    Container, Divider,
    Header,
} from "semantic-ui-react";
import React from "react";
import {CustomFooter} from "~/components/footer";
import {FullList} from "~/components/studorg";
import {FixedMenu} from "~/components/menu";

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
    return (
        <Container text className="main">
            <Header size={"huge"}> Все организации </Header>
            <Divider/>
            <FullList/>
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
