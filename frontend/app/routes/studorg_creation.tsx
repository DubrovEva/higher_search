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
    CardGroup, GridRow
} from "semantic-ui-react";
import React from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {faculty, gender, year, campus} from "~/components/options";
import {StudorgInfo} from "~/proto/models/studorg_pb";

export const meta: MetaFunction = () => {
    return [
        {title: "Личный кабинет"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function StudorgInfoForm() {
    return (
        <Form>
            <FormGroup widths='equal'>
                <FormInput fluid placeholder='Полное название' />
                <FormInput fluid placeholder='Краткое название' />
                <FormSelect
                    fluid
                    options={campus}
                    placeholder='Пол'
                />
            </FormGroup>
            <FormGroup>
                <FormSelect
                    fluid
                    options={faculty}
                    placeholder='Факультет'
                    width={12}
                />
                <FormSelect
                    fluid
                    options={year}
                    placeholder='Курс'
                />
            </FormGroup>
            <FormTextArea label='Описание' placeholder='Расскажите о себе' />
            <FormGroup  widths='equal'>
                <FormInput fluid placeholder='Email' />
                <FormInput fluid placeholder='Phone' />
            </FormGroup>
            <FormGroup  widths='equal'>
                <FormInput fluid placeholder='Telgram' />
                <FormInput fluid placeholder='VK' />
            </FormGroup>
            <FormInput fluid label='Photo' type={"file"}/>
            <FormButton>Submit</FormButton>
        </Form>
    );
}

function AllInfo() {
    return (
        <Container text className={"main"}  >
            <Header size={"huge"}> Создание студенческой организации </Header>
            <Divider/>
            <StudorgInfoForm/>
        </Container>
    );
}

export default function Account() {
    return (
        <>
            <FixedMenu/>

            <AllInfo/>

            <CustomFooter/>
        </>
    );
}
