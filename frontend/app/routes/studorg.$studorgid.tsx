import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/studorg.css?url";
import {Button, Container, Divider, Grid, GridColumn, Header, Label, Segment, SidebarPusher} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {FixedMenu} from "~/components/menu";
import Client from "~/client";
import {StudorgID, StudorgInfo} from "~/proto/models/studorg";
import {useParams} from "react-router";
import {AuthInfo} from "~/proto/models/user";
import {LoadingMessage} from "~/components/messages";
import {LinksView} from "~/components/studorg/links";
import {faculty} from "~/components/studorg/faculty";
import {language} from "~/components/studorg/language";
import {campus} from "~/components/studorg/campus";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function UserInStudorgButton(params: { studorgID: StudorgID }) {
    const [isUserInStudorg, setIsUserInStudorg] = useState(false)

    Client.getInstance().checkUserInStudorg(params.studorgID).then(check => setIsUserInStudorg(check))

    const addUserToStudorg = async () => {
        await Client.getInstance().addUserToStudorg(params.studorgID)
        setIsUserInStudorg(true)
    }
    const deleteUserFromStudorg = async () => {
        await Client.getInstance().deleteUserFromStudorg(params.studorgID)
        setIsUserInStudorg(false)
    }

    if (isUserInStudorg) {
        return <Button floated={"right"} basic onClick={deleteUserFromStudorg}> Покинуть организацию </Button>
    }
    return (
        <Button floated={"right"} basic onClick={addUserToStudorg}> Вступить в организацию </Button>
    )
}

function OrganizationInfo(params: { studorgInfo: StudorgInfo, studorgID: StudorgID, authInfo: AuthInfo }) {
    const currentCampus = campus.find(x => x.value === params.studorgInfo.campus)?.text
    const currentLanguage = language.find(x => x.value === params.studorgInfo.language)?.text
    const currentFaculty = faculty.find(x => x.value === params.studorgInfo.faculty)?.text

    return (
        <>
            <Segment>
                <Header size="huge">
                    {params.authInfo.isAuth && <UserInStudorgButton studorgID={params.studorgID}/>}
                    {params.studorgInfo.name}

                </Header>

                <Divider/>

                <p> {params.studorgInfo.description}</p>
            </Segment>

            <Grid stackable columns={"equal"} stretched>
                <GridColumn width={3}>
                    <Label horizontal>  {currentCampus}</Label>
                </GridColumn>
                <GridColumn>
                    <Label horizontal>  {currentFaculty}</Label>
                </GridColumn>
                <GridColumn width={3}>
                    <Label horizontal>  {currentLanguage} </Label>
                </GridColumn>
            </Grid>

            <LinksView links={params.studorgInfo.links!}/>

        </>
    );
}

export default function ViewStudorg() {
    const [studorgInfo, setStudorgInfo] = useState<StudorgInfo | undefined>(undefined)
    const params = useParams();

    const studorgID = StudorgID.create();
    studorgID.iD = params.studorgid?.toString()!

    useEffect(() => {
        Client.getInstance().getStudorgInfo(studorgID).then(x => setStudorgInfo(x))
    }, [])

    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <SidebarPusher>
                <FixedMenu authInfo={authInfo}/>
                <Container text className={"main"}>
                    {
                        studorgInfo ?
                            <OrganizationInfo studorgInfo={studorgInfo} studorgID={studorgID} authInfo={authInfo}/>
                            : <LoadingMessage/>
                    }
                </Container>
            </SidebarPusher>

        </>
    );
}
