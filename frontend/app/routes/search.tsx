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
    CardGroup, GridRow, FormDropdown, Segment
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {faculty, gender, year, campus, language, category} from "~/components/options";
import {AuthInfo, UserID} from "~/proto/models/user";
import Client from "~/client";
import {SearchRequest} from "~/proto/api/router";
import {Studorg, StudorgInfo, Studorgs} from "~/proto/models/studorg";
import {OrgCards} from "~/components/studorg";
import {LoadingMessage} from "~/components/messages";

export const meta: MetaFunction = () => {
    return [
        {title: "Поиск"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function StudorgInfoForm(params: {setStudorgs: (studorgs: Studorg[] | undefined ) => void}) {
    const [searchRequest, setSearchRequest] = useState(SearchRequest.create())

    const handleSubmit = async () => {
        const response = await Client.getInstance().searchStudorgs(searchRequest);
        params.setStudorgs(response)
        // let response: Studorg[] | undefined;
        // try {
        //     response = await Client.getInstance().searchStudorgs(searchRequest);
        // } catch {
        //     response = undefined
        // }
        // params.setStudorgs(response)
    }

    function handleUpdate(key: keyof SearchRequest) {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            setSearchRequest({...searchRequest, [key]: data.value})
        }
    }


    return (
        <Segment secondary>
            <Header size={"huge"}> Поиск студенческой организации </Header>
        <Form onSubmit={handleSubmit}>
            <FormSelect
                fluid
                options={faculty}
                label={"Факультет"}
                placeholder='Факультет'
                value={searchRequest.faculty}
                onChange={handleUpdate("faculty")}
            />
            <FormGroup widths="equal">
                <FormSelect
                    fluid
                    label={"Кампус"}
                    options={campus}
                    placeholder='Кампус'
                    value={searchRequest.campus}
                    onChange={handleUpdate("campus")}
                />
                <FormSelect
                    fluid
                    label={"Основной язык"}
                    options={language}
                    placeholder='Основной язык'
                    value={searchRequest.language}
                    onChange={handleUpdate("language")}
                />

            </FormGroup>
            <FormDropdown label={"Категории"} placeholder='Категории' fluid multiple selection
                          options={category}
                          value={searchRequest.tags}
                          onChange={handleUpdate("tags")}
            />

            <FormButton> Искать </FormButton>
        </Form>
        </Segment>
    );
}

function AllInfo() {
    const [studorgs, setStudorgs] = useState([] as Studorg[] | undefined)

    return (
        <Container text className={"main"}  >
            {/*<Divider/>*/}
            <StudorgInfoForm setStudorgs={setStudorgs}/>

            {studorgs !== undefined ?
                <Segment basic>
                    <OrgCards studorgs={studorgs}/>
                </Segment> : <LoadingMessage/>
            }
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
