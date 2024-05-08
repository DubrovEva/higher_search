import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/studorg.css?url";
import {
    Container,
    HeaderSubheader,
    Divider,
    Grid,
    GridColumn,
    Header,
    Image,
    Label,
    Segment,
    SidebarPusher,
    StepGroup, Step,
    GridRow
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {FixedMenu} from "~/components/menu";
import Client from "~/client";
import {StudorgID, StudorgInfo} from "~/proto/models/studorg";
import {useParams} from "react-router";
import {campus, faculty, language} from "~/components/options";
import {Language} from "~/proto/models/common";
import {UserCard} from "~/routes/user.$userid";
import {UserInfo} from "~/proto/models/user";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function PageContent(params: { studorgInfo: StudorgInfo }) {
    return (
        <Container text className={"main"}>
            <OrganizationInfo studorgInfo={params.studorgInfo}/>
        </Container>
    );
}

function OrganizationInfo(params: { studorgInfo: StudorgInfo }) {
    const currentCampus = campus.find(x => x.value === params.studorgInfo.campus)?.text
    const currentLanguage = "Русский" //TODO: language.find(x => x.value === params.studorgInfo.language)?.text
    const currentFaculty = faculty.find(x => x.value === params.studorgInfo.faculty)?.text


    return (
        <>
            <Segment>
            <Header size="huge"> {params.studorgInfo.name}
            </Header>
                <Divider/>

            <p> {params.studorgInfo.description}</p>
            </Segment>

            <Grid stackable columns={"equal"} stretched>
                <GridColumn width={3}>
                    <Label horizontal >  {currentCampus}</Label>
                </GridColumn>
                <GridColumn>
                    <Label horizontal>  {currentFaculty}</Label>
                </GridColumn>
                <GridColumn width={3}>
                    <Label horizontal>  {currentLanguage} </Label>
                </GridColumn>
            </Grid>

            {/*<UserCard userInfo={UserInfo.create()}/>*/}

        </>
    );
}

export default function Studorg() {
    const [studorgInfo, setStudorgInfo] = useState<StudorgInfo | undefined>(undefined)
    const params = useParams();

    const request = StudorgID.create();
    request.iD = params.studorgid?.toString()!

    useEffect(() => {
        Client.getInstance().getStudorgInfo(request).then(x => setStudorgInfo(x))
    }, [])

    return (
        <>
            <SidebarPusher>
                <FixedMenu/>
                {
                    studorgInfo
                        ? <PageContent studorgInfo={studorgInfo}/>
                        : <span>Loading...</span>
                }
            </SidebarPusher>

        </>
    );
}
