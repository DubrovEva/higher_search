import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/account.css?url";

import {
    Container,
    FormButton,
    FormGroup,
    Header,
    Form, FormDropdown, Segment
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import {CustomFooter} from "~/components/footer";
import {FixedMenu} from "~/components/menu";
import {category} from "~/components/options";
import {AuthInfo} from "~/proto/models/user";
import Client from "~/client";
import {SearchRequest} from "~/proto/api/router";
import {Studorg,} from "~/proto/models/studorg";
import {OrgCards} from "~/components/studorg/studorg";
import {LoadingMessage} from "~/components/messages";
import {FacultyForm} from "~/components/studorg/faculty";
import {LanguageForm} from "~/components/studorg/language";
import {CampusForm} from "~/components/studorg/campus";

export const meta: MetaFunction = () => {
    return [
        {title: "Поиск"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function SearchParams() {
    const [studorgs, setStudorgs] = useState(null as Studorg[] | undefined | null)
    const [searchRequest, setSearchRequest] = useState(SearchRequest.create())

    const handleSubmit = async () => {
        const response = await Client.getInstance().searchStudorgs(searchRequest);
        setStudorgs(response)
    }

    function handleUpdate(key: keyof SearchRequest) {
        return (e: any, data: { value?: boolean | number | string | (boolean | number | string)[] }) => {
            setSearchRequest({...searchRequest, [key]: data.value})
        }
    }

    return (
        <>
            <Segment secondary>
            <Header size={"huge"}> Поиск студенческой организации </Header>
        <Form onSubmit={handleSubmit}>

            <FormGroup widths="equal">

                <CampusForm value={searchRequest.campus} onChange={handleUpdate("campus")}/>

                <FacultyForm value={searchRequest.faculty} onChange={handleUpdate("faculty")}/>

                <LanguageForm value={searchRequest.language} onChange={handleUpdate("language")}/>


            </FormGroup>
            <FormDropdown label={"Категории"} placeholder='Категории' fluid multiple selection
                          options={category}
                          value={searchRequest.tags}
                          onChange={handleUpdate("tags")}
            />

            <FormButton> Искать </FormButton>
        </Form>
        </Segment>
            <Result studorgs={studorgs}/>
        </>
    );
}

function Result(params: {studorgs: Studorg[] | undefined | null}) {
    if (params.studorgs === undefined) {
        return <LoadingMessage/>
    }
    if (params.studorgs === null) {
        return <></>
    }

    return (
        <Segment basic>
            <OrgCards studorgs={params.studorgs}/>
        </Segment>
    )

}

export default function Search() {
    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}  >
                <SearchParams/>
            </Container>

            <CustomFooter/>
        </>
    );
}
