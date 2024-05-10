import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import dummy from "../assets/dummy.png?url";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardMeta,
    Container,
    Divider,
    FormButton,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextArea,
    Grid,
    GridColumn,
    Header,
    Icon,
    Image,
    Form,
    Label,
    CardGroup, GridRow, FormDropdown
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {faculty, gender, year, campus, language, category} from "~/components/options";
import {AuthInfo} from "~/proto/models/user";
import Client from "~/client";

export const meta: MetaFunction = () => {
    return [
        {title: "Поиск"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function StudorgInfoForm() {
    const routeToList = () => {
        window.location.href = "/list"
    }
    return (
        <Form onSubmit={routeToList}>
            <FormSelect
                fluid
                options={faculty}
                label={"Факультет"}
                placeholder='Факультет'
            />
            <FormGroup widths="equal">
                <FormSelect
                    fluid
                    label={"Кампус"}
                    options={campus}
                    placeholder='Кампус'
                />
                <FormSelect
                    fluid
                    label={"Основной язык"}
                    options={language}
                    placeholder='Основной язык'
                />

            </FormGroup>
            <FormDropdown label={"Категории"} placeholder='Категории' fluid multiple selection options={category}/>

            <FormButton>Submit</FormButton>
        </Form>
    );
}

function AllInfo() {
    return (
        <Container text className={"main"}  >
            <Header size={"huge"}> Поиск студенческой организации </Header>
            <Divider/>
            <StudorgInfoForm/>
        </Container>
    );
}

export default function Search() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <AllInfo/>

            <CustomFooter/>
        </>
    );
}
