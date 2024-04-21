import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/login.css?url";
import my_logo from "../assets/logo.png?url";
import {
    Button,
    Container, FormField, FormInput, Grid, GridColumn,
    Header, Image, Input, ItemMeta,
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
import {Form} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {title: "Регистрация"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function Body() {
    return (
        <Grid verticalAlign={"middle"} textAlign={"center"}>
            <GridColumn>
                <Header as="h1" color={"black"}>
                    <Image src={my_logo} href={"/"}/>
                    <div className="content">
                        Регистрация
                    </div>
                </Header>
                <Form className="ui large form" action={"/account"}>
                    <Segment stacked>
                        <FormField>
                            <Input iconPosition={"left"}>
                                <i className="user icon"></i>
                                <input type="text" name="email" placeholder="E-mail address"/>
                            </Input>
                        </FormField>
                        <FormField>
                            <Input iconPosition={"left"}>
                                <i className="lock icon"></i>
                                <input type="password" name="password" placeholder="Password"/>
                            </Input>
                        </FormField>
                        <Button fluid color="black" size="large" type="submit"> Login </Button>
                    </Segment>

                    <div className="ui error message"></div>

                </Form>

                <div className="ui message">
                    Уже есть аккаунт? <a href="/login"> Авторизация </a>
                </div>
            </GridColumn>
        </Grid>
    );
}

export default function Login() {
    return (
        <>
            <Body/>
        </>
    );
}
