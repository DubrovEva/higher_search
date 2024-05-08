import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";
import Client from "~/client";

import {
    Container,
    Form,
    FormButton,
    FormDropdown,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextArea,
    Header
} from "semantic-ui-react";
import React, {useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {campus, category, faculty, language} from "~/components/options";
import {StudorgInfo} from "~/proto/models/studorg";

export const meta: MetaFunction = () => {
    return [
        {title: "Личный кабинет"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

type Filter<T, F> = {
        [K in keyof T as T[K] extends F ? K : never]: T[K] & F
};

function StudorgInfoForm() {
    const [studorgInfo, setStudorgInfo] = useState(
        StudorgInfo.create()
    )

    const handleSubmit = () => {
        Client.getInstance().createStudorg(studorgInfo).then()

        // TODO: тут доставать из метода id и перекидывать на страницу новой организации
    }

    function handleUpdate(key: keyof StudorgInfo) {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            setStudorgInfo({...studorgInfo, [key]: data.value})
        }
    }

    function editable(key: keyof Filter<StudorgInfo, number | string>) {
        const value: string | number = (studorgInfo as Filter<StudorgInfo, number | string>)[key];
        return {
            value,
            onChange: handleUpdate(key)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormInput fluid label="Название" placeholder='Название' required {...editable('name')}/>
            <FormGroup widths='equal'>
                <FormSelect
                    fluid
                    label="Кампус"
                    width={7}
                    options={campus}
                    {...editable('campus')}
                    placeholder='Кампус'
                />
                <FormSelect
                    fluid
                    label="Факультет"
                    options={faculty}
                    {...editable('faculty')}
                    placeholder='Факультет'
                />
                <FormSelect
                    fluid
                    label="Язык"
                    options={language}
                    {...editable('language')}
                    placeholder='Язык'
                    width={6}
                />
            </FormGroup>
            <FormGroup>
            </FormGroup>
            <FormTextArea label='Краткое описание'
                          placeholder='Опиши организацию в 2-3 предложениях. Это короткое превью, которое будет отображаться в поиске.'
                          {...editable('shortDescription')}
            />
            <FormTextArea label='Описание'
                          placeholder='Полное описание организации, будет отображено на отдельной странице.'
                          {...editable('description')}/>

            <FormDropdown label={"Категории"} placeholder='Категории' fluid multiple selection options={category}
                value={studorgInfo.tags}
                onChange={handleUpdate("tags")}
            />

            <FormGroup widths='equal'>
            </FormGroup>
            <FormInput fluid label='Photo' type={"file"}/>
            <FormButton>Submit</FormButton>
        </Form>
    );
}

function AllInfo() {
    return (
        <Container text className={"main"}>
            <Header size={"huge"}> Создание студенческой организации </Header>
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
