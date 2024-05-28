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
    FormTextArea,
    Header, Placeholder, PlaceholderLine, PlaceholderParagraph
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {StudorgInfo} from "~/proto/models/studorg";
import {AuthInfo} from "~/proto/models/user";
import {NoRightsMessage} from "~/components/messages";
import {FacultyForm} from "~/components/studorg/faculty";
import {LanguageForm} from "~/components/studorg/language";
import {CampusForm} from "~/components/studorg/campus";
import {TagsForm} from "~/components/studorg/tags";
import {PlaceholderForm} from "~/components/placeholder";

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

    const handleSubmit = async () => {
        const studorgID = await Client.getInstance().createStudorg(studorgInfo)
        if (studorgID !== undefined) {
            window.location.href = "/studorg/" + studorgID.iD;
        }
        // TODO: обработка ошибок??
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
                <CampusForm value={studorgInfo.campus} onChange={handleUpdate("campus")}/>
                <FacultyForm value={studorgInfo.faculty} onChange={handleUpdate("faculty")}/>
                <LanguageForm value={studorgInfo.language} onChange={handleUpdate("language")}/>
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

            <TagsForm onChange={handleUpdate("tags")} value={studorgInfo.tags}/>

            <FormGroup widths='equal'>
            </FormGroup>
            {/*<FormInput fluid label='Photo' type={"file"}/>*/}
            <FormButton>Создать</FormButton>
        </Form>
    );
}

function AllInfo(params: {authInfo: AuthInfo | undefined}) {
    if (params.authInfo === undefined || !params.authInfo.isAuth) {
        return <PlaceholderForm/>
    }
    if (!params.authInfo.isAuth) {
        return <NoRightsMessage/>
    }

    return <StudorgInfoForm/>
}

export default function CreateStudorg() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}>
                <Header size={"huge"}> Создание студенческой организации </Header>

                <AllInfo authInfo={authInfo}/>

            </Container>

            <CustomFooter/>
        </>
    );
}
