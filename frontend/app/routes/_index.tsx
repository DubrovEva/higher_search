import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/index.css?url";
import { useNavigate } from "react-router-dom";
import hs_logo from "../assets/logo.png?url";

import {
    Button,
    Container, FormButton,
    Header, Icon, Image, ItemHeader, ItemImage,
    Menu,
    MenuItem,
    MenuMenu,
    Segment,
    SidebarPusher
} from "semantic-ui-react";
import React, {useState} from "react";
import {CustomFooter} from "~/components/footer";
import {OrganizationsMenu, SidebarMenu} from "~/components/menu";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function TopMenu(props: {toggleSidebar: () => void}) {
    let navigate = useNavigate();
    const routeToLogin = () =>{
        let path = `/login`;
        navigate(path);
    }
    const routeToRegistration = () =>{
        let path = `/registration`;
        navigate(path);
    }

    return (
        <Container>
        <Menu size="large" secondary inverted pointing>
            <a href="#" className="toc item" onClick={() => props.toggleSidebar()}>
                <Icon className={"sidebar icon"}/>
            </a>

            {/*<Image as="logo" src={hs_logo}/>*/}
            <MenuItem active> Главная </MenuItem>
            <MenuItem> <OrganizationsMenu/> </MenuItem>

            <MenuMenu position="right">
                <FormButton inverted onClick={routeToLogin}>Войти</FormButton>
                <FormButton inverted onClick={routeToRegistration}>Зарегистрироваться</FormButton>
            </MenuMenu>

        </Menu>
        </Container>
    );
}

function HeaderOfPage(props: {toggleSidebar: () => void}) {
    return (
        <Segment inverted vertical  className={"masthead"} textAlign={"center"}>
            <TopMenu toggleSidebar={props.toggleSidebar}/>

            <Container text>
                <Header as={"h1"} inverted>
                    Higher Search
                </Header>
                <h2>Сервис для поиска студенческих организаций Высшей Школы Экономики</h2>
                <Button size="huge" primary href={"/search"}> Поиск <i className="right arrow icon"> </i></Button>
            </Container>

        </Segment>
    );
}

function Body() {
    return (
        <>
            <Segment vertical className={"stripe"}>
                <Container text>
                    <Header size="medium" as={"h3"}> Внеучебная жизнь ВШЭ </Header>
                    <p> Вышка — это более 100 студенческих организаций, тысячи мероприятий и свое студенческое
                        самоуправление. Студенческая жизнь университета практически не поддается описанию: слишком
                        динамичная, разнообразная и для каждого своя. Единственный способ ее познать — стать ее
                        частью. </p>
                </Container>
            </Segment>
        </>
    );
}

export default function Index() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <>
            <SidebarMenu visible={sidebarVisible}/>
            <SidebarPusher>
                <HeaderOfPage toggleSidebar={() => setSidebarVisible(!sidebarVisible)}/>
                <Body/>
                <CustomFooter/>
            </SidebarPusher>

        </>
    );
}
