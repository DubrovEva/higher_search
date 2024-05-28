import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/login.css?url";
import my_logo from "../assets/logo.png?url";
import {Button, Form, FormField, Grid, GridColumn, Header, Image, Input, Message, Segment,} from "semantic-ui-react";
import React, {useState} from "react";
import {AuthorizationRequest} from "~/proto/api/router";
import Client from "~/client";
import {UserID} from "~/proto/models/user";

export const meta: MetaFunction = () => {
    return [
        {title: "Авторизация"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

export default function Login() {
    const [authorizationRequest, setAuthorizationRequest] = useState(
        AuthorizationRequest.create()
    )
    const [noError, setNoError] = useState(true)

    const handleSubmit = async () => {
        let response: UserID | undefined;
        try {
            response = await Client.getInstance().authorize(authorizationRequest);
        } catch {
            response = undefined
        }
        if (response !== undefined) {
            setNoError(true)
            window.location.href = "/user"
        } else {
            setNoError(false)
        }
    }

    function handleUpdate(key: keyof AuthorizationRequest) {
        return (e: any, data: { value?: string }) => {
            setAuthorizationRequest({...authorizationRequest, [key]: data.value})
        }
    }

    return <Grid verticalAlign={"middle"} textAlign={"center"} style={{height: "100vh"}}>
        <GridColumn>
            <Header as="h1" color={"black"}>
                <Image src={my_logo} href={"/"}/>
                <div className="content">
                    Авторизация
                </div>
            </Header>
            <Form className="ui large form" onSubmit={handleSubmit} error={!noError}>
                <Segment stacked>
                    <FormField>
                        <Input iconPosition={"left"} onChange={handleUpdate("email")}
                               value={authorizationRequest.email}>
                            <i className="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address"/>
                        </Input>
                    </FormField>
                    <FormField>
                        <Input iconPosition={"left"} onChange={handleUpdate("password")}
                               value={authorizationRequest.password}>
                            <i className="lock icon"></i>
                            <input type="password" name="password" placeholder="Password"/>
                        </Input>
                        <Message
                            error
                            header='Некорректные данные'
                            id={"errorMessage"}
                            content='Отсутствует пользователь с введеными данными'
                        />
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
}
