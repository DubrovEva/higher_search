import {
    Card,
    CardContent,
    CardDescription,
    CardGroup,
    CardHeader,
    CardMeta,
    Divider,
    Icon,
    Image,
    Item,
    ItemContent,
    ItemExtra,
    ItemGroup,
    ItemHeader,
    ItemImage,
    ItemMeta,
    Label
} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import dummy from "../assets/dummy.png?url";
import {Studorg, StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import {category} from "~/components/options";
import Client from "~/client";

export function OrgCards(params: { studorgs: Studorg[]}) {
    return (
        <CardGroup stackable itemsPerRow={1}>
            {params.studorgs.map(
                studorg => <OrgCard studorgInfo={studorg.studorgInfo!} ID={studorg.iD!}/>
            )}
        </CardGroup>
    );
}

export function OrgCard(params: { studorgInfo: StudorgInfo, ID: StudorgID}) {
    const [usersNumber, setUsersNumber] = useState<string | undefined>(undefined)

    useEffect(() => {
        Client.getInstance().usersNumber(params.ID).then(x => setUsersNumber(x))
    }, [])

    return (
        <Card href={"/studorg/" + params.ID.iD}>
            <CardContent>
                <Image floated='left' size='tiny' src={dummy}/>
                <CardHeader> {params.studorgInfo.name} </CardHeader>
                <CardMeta>
                    C {params.studorgInfo.createdAt?.seconds}
                </CardMeta>
                <CardMeta>
                    {usersNumber} <Icon name="id card"/>
                </CardMeta>
                <CardDescription> {params.studorgInfo.shortDescription} </CardDescription>
                <Divider/>
                <CardContent extra> <Icon name="tags" color="grey"/> <OrgTags tags={params.studorgInfo.tags}/> </CardContent>
            </CardContent>
        </Card>
    )
}

export function OrgTags(params: { tags: string[]}) {
    return params.tags.map(
        tag => <TagToLabel tag={tag}/>
    )
}

export function TagToLabel(params: {tag: string}) {
    const tagName = category.find(elem => elem.value == params.tag)?.text
    return (
        <Label> {tagName} </Label>
    )
}

export function RoleToLabel(params: {role: StudorgRole}) {
    if (params.role == StudorgRole.PARTICIPANT) {
        return <Label> Участник </Label>
    } else if (params.role == StudorgRole.ORGANIZER) {
        return <Label color="blue"> Организатор </Label>
    } else {
        return <Label color="green"> Глава </Label>
    }
}

function UserOrgCard(params: {studorg: Studorg}) {
    // params.studorg.studorgInfo?.admissionTime

    return <Card href={"/studorg/" + params.studorg.iD?.iD}>
        <CardContent>
            <Image
                floated='left'
                size='tiny'
                src={dummy}
            />
            <CardHeader > {params.studorg.studorgInfo?.name} </CardHeader>
            {params.studorg.studorgInfo?.admissionTime && <CardMeta> Участник с <AdmissionTime seconds={+params.studorg.studorgInfo?.admissionTime?.seconds}/> </CardMeta> }
            <CardContent extra> <RoleToLabel role={params.studorg.studorgInfo?.role!}/> </CardContent>
        </CardContent>
    </Card>
}

export function UserOrgCards(params: {studorgs: Studorg[]}) {
    return (
        <CardGroup stackable itemsPerRow={1}>
            {params.studorgs.map(
                studorg => <UserOrgCard studorg={studorg}/>
            )}
        </CardGroup>
    );
}

function AdmissionTime(params: {seconds: number}) {
    return new Date( params.seconds * 1000).toLocaleDateString();  // convert timestamp to milliseconds and construct Date object
}