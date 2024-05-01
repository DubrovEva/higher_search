import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/login.css?url";
import my_logo from "../assets/logo.png?url";
import {
    Button,
    FormField, Grid, GridColumn,
    Header, Image, Input,
    Segment,
} from "semantic-ui-react";
import React from "react";
import {Form} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {title: "Авторизация"},
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
                        Авторизация
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
                    Нет аккаунта? <a href="/registration"> Зарегистрироваться </a>
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
