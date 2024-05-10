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
    Header,
    Icon,
    Message,
    MessageContent,
    MessageHeader
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {campus, category, faculty, language} from "~/components/options";
import {StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import {AuthInfo} from "~/proto/models/user";
import {useParams} from "react-router";
import {LoadingRightsMessage, NoRightsMessage} from "~/components/messages";

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
    const [saved, saveInfo] = useState(false)

    const params = useParams();
    const studorgID = StudorgID.create();
    studorgID.iD = params.studorgid?.toString()!

    const [isOrg, setOrg] = useState<boolean | undefined>(undefined)
    useEffect(() => {
        Client.getInstance().getStudorgRole(studorgID).then(role => setOrg(role == StudorgRole.ORGANIZER || role == StudorgRole.HEAD))
    }, [])

    useEffect(() => {
        Client.getInstance().getStudorgInfo(studorgID).then(x => x ? setStudorgInfo(x) : undefined)
    }, [])

    if (isOrg == undefined)
        return <LoadingRightsMessage/>
    if (!isOrg) return <NoRightsMessage/>

    const handleSubmit = async () => {
        await Client.getInstance().updateStudorg({studorgInfo: studorgInfo, iD: studorgID})
        saveInfo(true)
        setTimeout(() => saveInfo(false), 2000)
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
        <Form onSubmit={handleSubmit} success={saved}>
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
            <Message
                success
                header='Сохранено'
            />
            <FormButton>Сохранить</FormButton>
        </Form>
    );
}

function AllInfo() {
    return (
        <Container text className={"main"}>
            <Header size={"huge"}> Редактирование студенческой организации </Header>
            <StudorgInfoForm/>
        </Container>
    );
}

export default function EditStudorg() {
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

