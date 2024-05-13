import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/login.css?url";
import my_logo from "../assets/logo.png?url";
import {Button, Form, FormField, FormInput, Grid, GridColumn, Header, Image, Message, Segment} from "semantic-ui-react";
import React, {FormEvent, useState} from "react";
import {RegistrationRequest} from "~/proto/api/router";
import Client from "~/client";
import {UserID} from "~/proto/models/user";

export const meta: MetaFunction = () => {
    return [
        {title: "Регистрация"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

export default function Login() {
    const [registrationRequest, setRegistrationRequest] = useState(
        RegistrationRequest.create()
    )
    const [noError, setNoError] = useState(true)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        let response: UserID | undefined;
        try {
            response = await Client.getInstance().register(registrationRequest);
        } catch {
            response = undefined
        }
        if (response !== undefined) {
            setNoError(true)
            window.location.href = "/user"
        } else {
            setNoError(false)
        }

        // e.preventDefault()

    }

    function handleUpdate(key: keyof RegistrationRequest) {
        return (e: any, data: { value?: string }) => {
            setRegistrationRequest({...registrationRequest, [key]: data.value})
        }
    }

    return (
        <Grid verticalAlign={"middle"} textAlign={"center"}>
            <GridColumn>
                <Header as="h1" color={"black"}>
                    <Image src={my_logo} href={"/"}/>
                    <div className="content">
                        Регистрация
                    </div>
                </Header>
                <Form className="ui large form" onSubmit={handleSubmit} error={!noError}>
                    <Segment stacked>
                        <FormField>
                            <FormInput required fluid placeholder="Имя" value={registrationRequest.name} onChange={handleUpdate("name")}/>
                            <FormInput required placeholder="Фамилия" value={registrationRequest.surname} onChange={handleUpdate("surname")}/>
                            <FormInput required placeholder="Email" value={registrationRequest.email} onChange={handleUpdate("email")}/>
                            <FormInput required fluid placeholder="Пароль" value={registrationRequest.password} onChange={handleUpdate("password")}/>
                            <Message
                                error
                                header='Некорректные данные'
                                id={"errorMessage"}
                                content='Проверьте правильность введенных данных. Email должен быть с доменом @edu.hse.ru'
                            />
                        </FormField>
                        <Button fluid color="black" size="large" type="submit"> Зарегистрироваться </Button>
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
