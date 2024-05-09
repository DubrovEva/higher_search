import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/studorg.css?url";
import {
    Container,
    Divider,
    Grid,
    GridColumn,
    Header,
    Label,
    Segment,
    SidebarPusher,
    Button
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {FixedMenu} from "~/components/menu";
import Client from "~/client";
import {StudorgID, StudorgInfo} from "~/proto/models/studorg";
import {useParams} from "react-router";
import {campus, faculty, language} from "~/components/options";
import {AuthInfo} from "~/proto/models/user";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function PageContent(params: { studorgInfo: StudorgInfo, studorgID: StudorgID, authInfo: AuthInfo }) {
    return (
        <Container text className={"main"}>
            <OrganizationInfo studorgInfo={params.studorgInfo} studorgID={params.studorgID} authInfo={params.authInfo}/>
        </Container>
    );
}

function UserInStudorgButton(params: {studorgID: StudorgID}) {
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
    const currentLanguage = "Русский" //TODO: language.find(x => x.value === params.studorgInfo.language)?.text
    const currentFaculty = faculty.find(x => x.value === params.studorgInfo.faculty)?.text

    return (
        <>
            <Segment>
            <Header size="huge">
                {params.studorgInfo.name}
                {params.authInfo.isAuth && <UserInStudorgButton studorgID={params.studorgID}/>}
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
                {
                    studorgInfo
                        ? <PageContent studorgInfo={studorgInfo} studorgID={studorgID} authInfo={authInfo}/>
                        : <span>Loading...</span>
                }
            </SidebarPusher>

        </>
    );
}
