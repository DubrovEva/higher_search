import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/studorg.css?url";
import {
    Button,
    Container, Grid,
    Header, Image, ItemMeta,
    Menu,
    MenuItem,
    MenuMenu,
    Segment,
    Sidebar,
    SidebarPusher
} from "semantic-ui-react";
import React from "react";
import {RouterClient} from "~/proto/api/RouterServiceClientPb";
import {StudorgID, StudorgInfo} from "~/proto/models/studorg_pb";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function FixedMenu() {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <MenuItem> Главная </MenuItem>
                <MenuItem> Список </MenuItem>
                <MenuMenu position="right">
                    <MenuItem>
                        <Button> Войти </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button primary> Зарегистрироваться </Button>
                    </MenuItem>
                </MenuMenu>
            </Container>

        </Menu>
    );
}

function PageContent(params: { studorgInfo: StudorgInfo }) {
    return (
        <Container text className={"main"}>
            <Header as={"h1"}> {params.studorgInfo.getName() }</Header>
            <p> {params.studorgInfo.getDescription() }</p>
        </Container>
    );
}

export default function Studorg() {
    return (
        <>
            <SidebarPusher>
                <FixedMenu/>
                {/*<PageContent studorgInfo={studorgInfo}/>*/}
            </SidebarPusher>

        </>
    );
}
