import type {LinksFunction, MetaFunction} from "@remix-run/node";

import semanticStyles from "semantic-ui-css/semantic.min.css?url";
import styles from "~/styles/studorg.css?url";
import {Button, Container, Divider, Grid, GridColumn, Header, Label, Segment} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {FixedMenu} from "~/components/menu";
import Client from "~/client";
import {ModerationStatus, StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import {useParams} from "react-router";
import {AuthInfo} from "~/proto/models/user";
import {LoadingMessage, OrgHiddenByHeadMessage, OrgHiddenByModeratorMessage} from "~/components/messages";
import {LinksView} from "~/components/studorg/links";
import {faculty} from "~/components/studorg/faculty";
import {language} from "~/components/studorg/language";
import {campus} from "~/components/studorg/campus";
import {Moderation} from "~/components/moderation";
import {Admins} from "~/components/studorg/admins";
import {TagsView} from "~/components/studorg/tags";
import {UserInStudorgButton} from "~/components/studorg/buttons";

export const meta: MetaFunction = () => {
    return [
        {title: "Higher search"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: semanticStyles},
    {rel: "stylesheet", href: styles},
];

function OrganizationInfo(params: { studorgInfo: StudorgInfo, studorgID: StudorgID, authInfo: AuthInfo }) {
    if (params.studorgInfo.moderationStatus === ModerationStatus.HIDDEN_BY_MODERATOR) {
        return <OrgHiddenByModeratorMessage/>
    }
    if (params.studorgInfo.moderationStatus === ModerationStatus.HIDDEN_BY_HEAD) {
        return <OrgHiddenByHeadMessage/>
    }

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
                    <Label horizontal> {currentCampus}</Label>
                </GridColumn>
                <GridColumn>
                    <Label horizontal> {currentFaculty}</Label>
                </GridColumn>
                <GridColumn width={3}>
                    <Label horizontal> {currentLanguage} </Label>
                </GridColumn>
            </Grid>


            <Grid columns={2} container inverted>
                <GridColumn width={5}>
                    <TagsView tags={params.studorgInfo.tags!}/>
                </GridColumn>
                <GridColumn width={10} floated={"right"}>
                    <Admins studorgID={params.studorgID}/>
                    <LinksView links={params.studorgInfo.links!}/>
                </GridColumn>
            </Grid>

        </>
    );
}

export default function ViewStudorg() {
    const [studorgInfo, setStudorgInfo] = useState<StudorgInfo | undefined>(undefined)
    const params = useParams();

    const studorgID = StudorgID.create();
    studorgID.iD = params.studorgid?.toString()!

    useEffect(() => {
        if (studorgInfo === undefined) {
            Client.getInstance().getStudorgInfo(studorgID).then(x => setStudorgInfo(x))
        }
    }, [studorgInfo])

    const [authInfo, setAuthInfo] = useState(AuthInfo.create())
    useEffect(() => {
        Client.getInstance().authInfo().then(info => setAuthInfo(info))
    }, [])

    return (
        <>
            <FixedMenu authInfo={authInfo}/>

            <Container text className={"main"}>
                {
                    studorgInfo ?
                        <OrganizationInfo studorgInfo={studorgInfo} studorgID={studorgID} authInfo={authInfo}/>
                        : <LoadingMessage/>
                }

                {authInfo.ableToModerate &&
                    <Moderation studorg={{iD: studorgID, studorgInfo: studorgInfo}} setStudorgInfo={setStudorgInfo}/>}

            </Container>


        </>
    );
}
